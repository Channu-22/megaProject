import mongoose from "mongoose";
import { instance } from "../config/razorpay";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";
import Course from "../models/course.js";
import User from "../models/user.js";
import mailSender from "../utils/mailSender.js";

export const capturePayment = async (req, res) => {
    //get course and user ID
    const { courseId } = req.body;
    const userId = req.user.id;
    //validation
    if (!courseId) {
        return res.status(400).json({
            success: false,
            message: "please provide valid courseId"
        })
    }
    //valid course ID
    let course;
    try {
        course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "course not found"
            })
        }
        //check user already paid for the same course
        //user id string to converted into object ID
        const uId = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uId)) {
            return res.status(400).json({
                success: false,
                message: "Student is already enrolled"
            })
        }

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })

    }
    //order create 
    const amount = course.price;
    const currency = "INR";
    const option = {
        amount: amount * 100,
        currency,
        receipt: Date.now().toString(),
        notes: {
            Course_Id: course._id,
            User_Id: userId
        }
    }
    try {
        //Initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(option);
        console.log("payment response: ", paymentResponse);
        //return response
        return res.status(200).json({
            success: true,
            message: "Payment initiated successfully",
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: "Could not initiate the order"
        })


    }


}



//VERIFY SIGNATURE OF RAZORPAY AND SERVER
// export const verifySignature = async (req, res) => {
//     const webhookSecret = "22072002";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("payment is Authorised")

//         //find the course and enroll the student in it
//         const { Course_Id, User_Id } = req.body.payload.payment.entity.notes;



//         try {
//             const enrollCourse = await Course.findOneAndUpdate({ _id: course_id },
//                 {
//                     $push: {
//                         studentsEnrolled: user_id
//                     }
//                 },
//                 { new: true });

//             if (!enrollCourse) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Course not found",
//                 });
//             }

//             console.log("Enrolled course  :", enrollCourse);
//             //find the student and the course  to their list of enrolled courses
//             const enrollStundent = await User.findOneAndUpdate({ _id: user_id },
//                 {
//                     $push: {
//                         courses: course_id
//                     }
//                 },
//                 { new: true });
//             if (enrollStundent) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Student not found"
//                 })
//             }

//             //send the mail of confirmation
//             const emailResponse = await mailSender(enrollStundent.email,
//                 "Congratulation from channu-sinnur",
//                 "Your are onborded into new course"
//             )
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and course added"
//             })

//         } catch (err) {
//             console.log(err.message)
//             return res.status(500).json({
//                 success: false,
//                 message: err.message
//             })

//         }
//     }
//     else {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid request || signature not matched"
//         })
//     }

// }
import crypto from "crypto";
import Course from "../models/course.js";
import User from "../models/user.js";
import mailSender from "../utils/mailSender.js";

export const verifySignature = async (req, res) => {
    try {
        const webhookSecret = "22072002"; // better: process.env.RAZORPAY_WEBHOOK_SECRET

        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if (signature !== digest) {
            return res.status(400).json({
                success: false,
                message: "Invalid request || signature not matched",
            });
        }

        console.log("Payment is Authorised");

        // notes from Razorpay payment entity
        const { Course_Id, User_Id } = req.body.payload.payment.entity.notes;

        //  Enroll student in course
        const enrollCourse = await Course.findOneAndUpdate(
            { _id: Course_Id },
            {
                $addToSet: {
                    studentsEnrolled: User_Id, 
                },
            },
            { new: true }
        );

        if (!enrollCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        console.log("Enrolled course:", enrollCourse._id);

        //  Add course to user's courses list
        const enrollStudent = await User.findOneAndUpdate(
            { _id: User_Id },
            {
                $addToSet: {
                    courses: Course_Id,
                },
            },
            { new: true }
        );

        if (!enrollStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        //Send confirmation email
        await mailSender(
            enrollStudent.email,
            "Congratulations from channu-sinnur",
            "You are onboarded into a new course"
        );

        return res.status(200).json({
            success: true,
            message: "Signature verified and course added",
        });
    } catch (err) {
        console.log("Error in verifySignature:", err.message);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


