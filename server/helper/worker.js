import { parentPort, workerData } from 'worker_threads';
import fs from 'fs';
import axios from 'axios';

const processFile = async(file) => {
    try {
        const analytics = await getAnalytics(file);
        parentPort.postMessage(analytics);
    } catch (error) {
        throw new Error(error.message);
    }
}

 const getAnalytics = async (file) => {
    try {
        const fileContent = fs.readFileSync(file.path, 'utf-8');
        const {words, uniqueWords, uniqueWordMap, uniqueWordsArray, synonyms} = await countUniqueWords(fileContent);
        const fileInfo = {
            originalName: file.originalname,
            uniqueName: file.filename,
            size: file.size,
            words,
            uniqueWordMap,
            uniqueWords,
            synonyms,
            uniqueWordsArray
            // maskedContent: maskWords(fileContent, ['word1', 'word2']) // Add words to mask here
        };
        return fileInfo;
    } catch (error) {
        throw error
    }

}

const countUniqueWords = async(content) => {
    try {
        const words = content.toLowerCase().match(/\b(\w+)\b/g);
        const uniqueWords = new Set(words);
        const uniqueWordsArray = Array.from(uniqueWords);
        const uniqueWordMap = {};
        words.forEach(word => {
            uniqueWordMap[word] = (uniqueWordMap[word] || 0) + 1;
        });
        const wordsWithSynonyms = await Promise.all(uniqueWordsArray.map(word => getSynonyms(word)))
        // const result = await Promise.all(wordsWithSynonyms);
        return {words, uniqueWords, uniqueWordMap, uniqueWordsArray, synonyms: wordsWithSynonyms};
    } catch (error) {
        throw error;
    }

}

const getSynonyms = (word) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${process.env.YANDEX_API_KEY}&lang=en-en&text=${word}`);
            const synonyms = [];
            response.data.def?.[0]?.tr?.map((t) => {
                t?.syn?.map((sy) => {
                    synonyms.push(sy);
                })
            });
            const result = {[word]: synonyms}
            resolve(result || []);
            } catch (error) {
                error = error?.response ? error.response.data : new Error(error);
                reject(error)
            }
    })
}
processFile(workerData.file);
