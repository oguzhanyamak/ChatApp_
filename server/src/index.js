import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import {connectDb} from "./lib/db.js";
import cookieParser from 'cookie-parser';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;



app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}...`);
    connectDb();
});