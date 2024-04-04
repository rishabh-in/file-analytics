import { parentPort, workerData } from 'worker_threads';
import fs from 'fs';
import axios from 'axios';

const processFile = async(filePath) => {
    try {
        const analytics = await getAnalytics(filePath);
        parentPort.postMessage(analytics);
    } catch (error) {
        parentPort.postMessage({ error: error.message });
    }
}

 const getAnalytics= async (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileInfo = {
        name: filePath.split('/').pop(),
        size: fs.statSync(filePath).size,
        analytics: await countUniqueWords(fileContent),
        // maskedContent: maskWords(fileContent, ['word1', 'word2']) // Add words to mask here
    };
    return fileInfo;
}

const countUniqueWords = async(content) => {
    const words = content.toLowerCase().match(/\b(\w+)\b/g);
    const uniqueWords = new Set(words);
    const uniqueWordsArray = Array.from(uniqueWords);
    const uniqueWordCount = {};
    words.forEach(word => {
        uniqueWordCount[word] = (uniqueWordCount[word] || 0) + 1;
    });
    const wordsWithSynonyms = await Promise.all(uniqueWordsArray.map(word => getSynonyms(word)))
    const result = await Promise.all(wordsWithSynonyms);

    return {words, uniqueWords, uniqueWordCount, uniqueWordsArray, synonyms: result};
}

const getSynonyms = (word) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${process.env.YANDEX_API_KEY}&lang=en-en&text=${word}`)
            const synonyms = [];
            response.data.def?.[0]?.tr?.map((t) => {
                t?.syn?.map((sy) => {
                    synonyms.push(sy);
                })
            });
            const result = {[word]: synonyms}
            resolve(result || []);
            } catch (error) {
                reject("Error in getting response")
            }
    })
}


async function maskWords(content, wordsToMask) {
    let maskedContent = content;
    wordsToMask.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        maskedContent = maskedContent.replace(regex, '***');
    });
    return maskedContent;
}

processFile(workerData.filePath);
