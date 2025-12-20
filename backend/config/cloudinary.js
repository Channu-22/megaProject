import { v2 as cloudinary } from "cloudinary" // Cloudinary import

export const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      // Configuring Cloudinary for media upload
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })
  } catch (error) {
    console.error("cloaudinary connection error: ",error)
  }
}
