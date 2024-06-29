import mongoose from "mongoose";


export default async function connectDB() {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}