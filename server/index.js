import http from 'http';
import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import FileRouter from './routes/file.route.js';
import connectDB from './utils/connectDB.js';
import generateLogs from './middleware/logs.js';
import setupSockets from './utils/setupSockets.js';

const app = express();
app.use(cors())
const server = http.createServer(app);
export const soc = setupSockets(server);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
dotenv.config();

connectDB();
app.use(generateLogs);
app.use("/api", FileRouter);



server.listen(process.env.PORT, () => {
  console.log("Server is running on ", process.env.PORT);
})

