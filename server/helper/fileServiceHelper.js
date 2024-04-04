import {Worker} from 'worker_threads';

export const processFile = (file) => {
  return new Promise((resolve, reject) => {
      const worker = new Worker('./helper/worker.js', { workerData: { file } });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
          if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
  });
}