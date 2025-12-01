import crypto from "crypto"
import bcrypt from "bcrypt"
import User from "../models/user.js"
import mailSender from "../utils/mailSender.js"

//resetPassword token
export const resetPasswordToken = async (req, res) => {
    try {
        //fetch email from req body
        const { email } = req.body;

        //check user for this email and email validation
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email is not registered"
            })
        }
        //generate token
        const token = crypto.randomUUID();

        //update the token and expiration time to the User DB
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            { new: true });
        console.log("reset token details:", updatedDetails);

        //create url
        const url = `http://localhost:3000/update-password/${token}`

        //send mail containing the url
        await mailSender(email, "password reset link",
            `reset password link is: ${url}`
        );

        //return response
        return res.status(200).json({
            success: true,
            message: "Email sent successfully, please check mail and change the password"
        })
    } catch (err) {
        console.log("Error while sending reset password email: ", err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while generating reset password token"
        });
    }
}


//resetPassword
export const resetPassword = async (req, res) => {
    try {
        //fetch the data
        //all data from frontend added to  body
        const { password, confirmPassword, token } = req.body;

        if (!password || !confirmPassword || !token) {
            return res.status(400).json({
                success: false,
                message: "Password, confirm password and token are required",
            });
        }

        //validating data 
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password not matching"
            })
        }

        //fetch the user detail using token
        const userDetails = await User.findOne({ token: token });
        //if no entry thank its invalid token
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid password reset token",
            })
        }

        //token time check
        if (!userDetails.resetPasswordExpires || userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token is expired, please re-generate reset link"
            })
        }

        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);

        //udpate the password in DB
        userDetails.password = hashedPassword;
        userDetails.token = undefined;
        userDetails.resetPasswordExpires = undefined;
        await userDetails.save();
        // await User.findOneAndUpdate(
        //     { token },
        //     {
        //         password: hashedPassword,
        //         token: undefined,
        //         resetPasswordExpires: undefined,
        //     },
        //     { new: true }
        // );

        //return response
        return res.status(200).json({
            success: true,
            message: "password reset successfull;"
        });


    } catch (err) {
        console.log("error in resetPassword: ", err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password",
        })

    }
}