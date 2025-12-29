import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js"

//auth
export const authCheck = async (req, res, next) => {
    try {
        //fetch token 
        const token = req.body.token ||
            req.cookies.channu ||
            req.header("Authorization").replace("Bearer ", "");

        //if token missing then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }
        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRETE);
            req.user = decode;
            console.log("decoded token: ", decode);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
        next();
    } catch (err) {
        console.log("Error in token validation: ", err.message);
        return res.status(500).json({
            success: false,
            message: "something went wrong while validating the token"
        });

    }
}


//isStudent
export const isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for students only"
            })
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User accountType cannot be verified please try again"
        })

    }
}


//isInstructor
export const isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructors only"
            })
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User accountType cannot be verified please try again"
        })

    }
}

//isAdmin
export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admins only"
            })
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User accountType cannot be verified please try again"
        })

    }
}