import express from 'express'
import dotenv from 'dotenv';
import FileRouter from './routes/file.route.js';
import connectDB from './utils/connectDB.js';
const app = express();
dotenv.config();

connectDB();
app.use("/api", FileRouter);


app.listen(process.env.PORT, () => {
  console.log("Server is running on ", process.env.PORT);
})

