import otpGenerator from "otp-generator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import validator from "validator"
import User from "../models/user.js"
import OTP from "../models/otp.js"
import Profile from "../models/profile.js"

dotenv.config();

// SEND OTP

export const sendOTP = async (req, res) => {
    try {
        // fetch email from body
        const { email } = req.body;
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        // check user is already exit or not 
        const existingUser = await User.findOne({ email });
        //if exit return response
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exist"
            })
        }


        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("otp is: ", otp)

        //check if unique otp or not 
        let otpExist = await OTP.findOne({ otp: otp });
        if (otpExist) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            otpExist = await OTP.findOne({ otp: otp });
        }


        const otpPayload = { email, otp };
        console.log("otpPaylod is: ", otpPayload);

        const otpBody = await OTP.create(otpPayload);
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: otp
        })

    } catch (err) {
        console.error("Error in sending OTP:", err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending OTP",
            error: err.message,
        });

    }
}



// SIGN UP
export const signUp = async (req, res) => {
    try {
        //fetch the data from the body 
        const {
            firstName,
            lastName,
            email,
            contactNumber,
            password,
            confirmPassword,
            otp,
            accountType
        } = req.body;

        //validate data
        if (!firstName || !lastName || !email || !contactNumber || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields is required",
            });

        }

        //match the password 
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Both password is not matching",
            });
        }

        //check the user already exist or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exist",
            });
        }

        //find most recent stored OTP for the user
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("checking recent OTP: ", recentOTP);
        if (recentOTP.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } else if (recentOTP.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const profileDetail = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber

        });
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,

            contactNumber,
            accountType,
            additionalDetails: profileDetail._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed==${firstName} ${lastName}`
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        })

    } catch (err) {
        console.log("Error while signUp: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while registering user",
        })
    }
}


// LOGIN
export const login = async (req, res) => {
    try {
        //fetch the data from the body
        const { email, password } = req.body;
        //validation of data
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Emails and password are required",
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        //check user already exist or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not registered, please signUp",
            })

        }

        //match the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            })
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.accountType,
        }

        //generate JWT
        let token = jwt.sign(payload, process.env.JWT_SECRETE, {
            expiresIn: "1d",
        });

        //hiding sensitive part
        let responseUser = {
            id: user._id,
            email: user.email,
            role: user.accountType,
            token: token
        };
        const option = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }


        //create the cookies
        return res.cookie("channu", token, option).status(200).json({
            success: true,
            message: "User logged in successfully",
            user: responseUser
        })


    } catch (err) {
        console.log("Error while login: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while logging",
        })

    }
}


// CHANEG PASSWORD
export const changePassword= async(req,res) => {
    try{
        //fetch data from body

        //fetch oldPassword,newPassword and confirmPassword

        //validation

        //update password in DB

        //send mail updated pass

        //return response

    }catch(err){

    }
}