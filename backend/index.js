import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routers/userRoutes.js";
import movieRoutes from "./routers/movieRoutes.js";
import cors from "cors"
import dns from "dns"

dotenv.config();
connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())



app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes)

app.listen(3000, () => {
    console.log("listening to port 3000")
})