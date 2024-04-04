import express, { urlencoded } from 'express'
import dotenv from 'dotenv';
import FileRouter from './routes/file.route.js';
import connectDB from './utils/connectDB.js';
import generateLogs from './middleware/logs.js';
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
dotenv.config();

connectDB();
app.use(generateLogs);
app.use("/api", FileRouter);


app.listen(process.env.PORT, () => {
  console.log("Server is running on ", process.env.PORT);
})

