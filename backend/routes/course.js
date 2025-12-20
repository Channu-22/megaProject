createSection// Import the required modules
import express from "express"
const router = express.Router()
//  mongodb+srv://channuSinnur22:xyz@e-com-store.hrfmgiv.mongodb.net/?appName=e-com-store
// Import the Controllers

// Course Controllers Import
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
  // getFullCourseDetails,
  // editCourse,
  // getInstructorCourses,
  // deleteCourse,
} from "../controllers/course.js"

// Categories Controllers Import
import {
  getAllCategory,
  createCategory,
  CategoryPageDetails,
} from "../controllers/category.js"

// Sections Controllers Import
import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/section.js"

// Sub-Sections Controllers Import
import {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} from "../controllers/subSection.js"

// Rating Controllers Import
import {
  creatingRatingAndReviews,
  getAverageRatingAndReviews,
  getAllRatingAndReviews,
} from "../controllers/ratingAndReview.js"

// import { updateCourseProgress } from "../controllers/courseProgress.js"

// Importing Middlewares
import { authCheck, isInstructor, isStudent, isAdmin } from "../middlewares/auth.js"

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", authCheck, isInstructor, createCourse)

// Add a Section to a Course
router.post("/addSection", authCheck, isInstructor, createSection)

// Update a Section
router.post("/updateSection", authCheck, isInstructor, updateSection)

// Delete a Section
router.post("/deleteSection", authCheck, isInstructor, deleteSection)

// Edit Sub Section
router.post("/updateSubSection", authCheck, isInstructor, updateSubSection)

// Delete Sub Section
router.post("/deleteSubSection", authCheck, isInstructor, deleteSubSection)

// Add a Sub Section to a Section
router.post("/addSubSection", authCheck, isInstructor, createSubSection)

// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)

// Get Details for a Specific Course
router.post("/getCourseDetails", getCourseDetails)

// Get Full Details of a Specific Course
// router.post("/getFullCourseDetails", authCheck, getFullCourseDetails)

// Edit Course route
// router.post("/editCourse", authCheck, isInstructor, editCourse)

// Get all Courses under a Specific Instructor
router.get("/getInstructorCourses", authCheck, isInstructor, getCourseDetails)

// Delete a Course
// router.delete("/deleteCourse", deleteCourse)

// Course progress
// router.post("/updateCourseProgress", authCheck, isStudent, updateCourseProgress)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

router.post("/createCategory", authCheck, isAdmin, createCategory)
router.get("/showAllCategories", getAllCategory)
router.post("/getCategoryPageDetails", CategoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/creatingRatingAndReviews", authCheck, isStudent, creatingRatingAndReviews)
router.get("/getAverageRatingAndReviews", getAverageRatingAndReviews)
router.get("/getReviews", getAllRatingAndReviews)

export default router;
