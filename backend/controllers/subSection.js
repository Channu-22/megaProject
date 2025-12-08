import Section from "../models/section.js";
import subSection from "../models/subSection.js";
// import SubSection from "../models/subSection.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

export const createSubSection = async (req, res) => {
    try {
        //fetch the data 
        const { sectionId, title, timeDuration, description } = req.body;

        //extract file/video
        const video = req.files.videoFile;
        //validation
        if (!sectionId || !timeDuration || !title || !description) {
            return res.status(400).json({
                success: true,
                message: "All fields required"
            })
        }
        //upload video to cloudinary
        const uploadVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //creat a subSection
        const subSectionDetails = await subSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadVideo.secure_url
        })
        //update the subSection objectId to section schema
        const updateSection = await Section.findByIdAndUpdate({ _id: sectionId },
            {
                $push: {
                    subSection: subSectionDetails._id
                }
            },
            {
                new: true
            }).populate("subSection").exec();
        //return the response
        return res.status(200).json({
            success: true,
            message: "subSection created successfully",
            data: updateSection
        })

    } catch (err) {
        console.log("Error while creating subSection: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to create subSection"
        });

    }
}

//update subSection
export const updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, timeDuration } = req.body;

    // basic validation
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId is required",
      });
    }

    // find subsection
    const subSectionDetails = await subSection.findById(subSectionId);

    if (!subSectionDetails) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // update simple fields if they are sent
    if (title) subSectionDetails.title = title;
    if (description) subSectionDetails.description = description;
    if (timeDuration) subSectionDetails.timeDuration = timeDuration;

    // if new video is uploaded
    if (req.files && req.files.videoFile) {
      const video = req.files.videoFile;
      const uploadVideo = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSectionDetails.videoUrl = uploadVideo.secure_url;
    }

    // save updated document
    await subSectionDetails.save();

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: subSectionDetails,
    });
  } catch (err) {
    console.log("Error while updating subSection: ", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update SubSection",
    });
  }
};



//delete subSection
export const deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId and sectionId are required",
      });
    }

    // remove subSectionId from section.subSection array
    await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );

    // delete subSection document
    await subSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (err) {
    console.log("Error while deleting subSection: ", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete SubSection",
    });
  }
};
