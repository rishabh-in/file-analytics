import http from 'http';
import express, { urlencoded } from 'express'
import dotenv from 'dotenv';
import {Server} from 'socket.io';
import FileRouter from './routes/file.route.js';
import connectDB from './utils/connectDB.js';
import generateLogs from './middleware/logs.js';

const app = express();
const server = http.createServer(app);
const soc = new Server(server);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
dotenv.config();

connectDB();
app.use(generateLogs);
app.use("/api", FileRouter);

soc.on("connection", (socket) => {
  console.log("Connected to sockets")
})

app.listen(process.env.PORT, () => {
  console.log("Server is running on ", process.env.PORT);
})

