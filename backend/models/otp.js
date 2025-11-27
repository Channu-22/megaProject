import mongoose from "mongoose";
import mailSender from "../utils/mailSender";


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    }
    ,
    otp: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    }

});

// A FUNCTION TO SEND MAILS
async function sendVerificationEmail(email,otp){
    try{
        let mailResponse = await mailSender(
            email, 
            "Verification Email from studyNotion Project", 
            `<h1>Your OTP is ${otp}</h1>`
        );
        console.log("Email sent successfully: ", mailResponse);

    }catch(err){
        console.log("error occured when sending mail: ", err.message)
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

export default mongoose.model("OTP", otpSchema);
