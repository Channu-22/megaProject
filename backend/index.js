import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressFileUpload from "express-fileupload"

import userRoutes from "./routes/user.js";
import profileRoutes from "./routes/profile.js";
import paymentRoutes from "./routes/payment.js";
import courseRoutes from "./routes/course.js";

import dbConnection from "./config/dataBase.js";
import { cloudinaryConnect } from "./config/cloudinary.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;
// ================== Middlewares ==================
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
    })
);
app.use(
    expressFileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)
// ================== clodinary connection ==================
cloudinaryConnect(); 

// ================== routes ==================
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

// ================== default routes ==================
app.get("/",(req,res) => {
    return res.json({
        success:true,
        message:"your server is up and running....."
    })
})

// ================== dbConnection ==================
const server = async() => {
    try{
        await dbConnection();
        app.listen(PORT,() => {
            console.log(`server is running at port ${PORT} successfully`);
        })
    }catch(err){
        console.error("error iin dbConnection: ",err.message);
        process.exit(1);
    }
}
server();


