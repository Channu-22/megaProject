import express from "express"
import { authCheck,isStudent, isInstructor } from "../middlewares/auth.js"
import {
  deleteAccount,
  updateProfile,
  getUserDetails,
  // updateDisplayPicture,
  // getEnrolledCourses,
  // instructorDashboard,
} from "../controllers/profile.js"


const router = express.Router()

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete("/deleteProfile", authCheck,isStudent, deleteAccount)

// Update Profile
router.put("/updateProfile", authCheck, updateProfile)

// Get User Details
router.get("/getUserDetails", authCheck, getUserDetails)

// Get Enrolled Courses
// router.get("/getEnrolledCourses", authCheck, getEnrolledCourses)

// Update Display Picture
// router.put("/updateDisplayPicture", authCheck, updateDisplayPicture)

// Instructor Dashboard
// router.get("/instructorDashboard", authCheck, isInstructor, instructorDashboard)

export default router;
