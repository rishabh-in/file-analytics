import {Worker} from 'worker_threads';

export const processFile = (filePath) => {
  return new Promise((resolve, reject) => {
      const worker = new Worker('./helper/worker.js', { workerData: { filePath } });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
          if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
  });
}