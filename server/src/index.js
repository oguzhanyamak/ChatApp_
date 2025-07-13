import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectDb} from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app,server } from './lib/socket.js';
dotenv.config();



app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    }));
const PORT = process.env.PORT || 8080;



app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}...`);
    connectDb();
});