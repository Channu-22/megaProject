import { v2 as cloudinary } from "cloudinary";

// upload image to cloudinary
export const uploadImageToCloudinary = async (
  file,
  folder,
  height,
  quality
) => {
  try {
    const options = { folder };

    if (height) options.height = height;
    if (quality) options.quality = quality;

    options.resource_type = "auto";

    // ✅ IMPORTANT: return upload response
    const result = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );

    return result; 
  } catch (error) {
    console.log("Cloudinary upload error:", error.message);
    return null;
  }
};

