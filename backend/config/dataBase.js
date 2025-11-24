import mongoose from "mongoose"
import dotenv from "dotenv";

// LOAD ENV VARIABLE
dotenv.config();

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("dbConnection successfull")
    }
    catch(err){
        console.log("Error in dbConnection :", err.message);
        process.exit(1);
    }
}

export default dbConnection;