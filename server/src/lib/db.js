import mongoose from 'mongoose';

export const connectDb = async () =>{
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI,{dbName:process.env.DATABASE_NAME});
        console.log(`MongoDB connected : ${conn.connection.host}`);
    }catch (e){
        console.error("MongoDb connection error "+e);
    }

}