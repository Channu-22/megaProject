// Import the required modules
import express from "express"
import { capturePayment, verifyPayment,  } from "../controllers/payment.js"
import { authCheck, isInstructor, isStudent, isAdmin } from "../middlewares/auth.js"

const router = express.Router()

router.post("/capturePayment", authCheck, isStudent, capturePayment)
router.post("/verifyPayment", authCheck, isStudent, verifyPayment)
// router.post("/sendPaymentSuccessEmail", authCheck, isStudent, sendPaymentSuccessEmail)

export default router;
