import Profile from "../models/profile.js";
import User from "../models/user.js";

export const updateProfile = async (req, res) => {
    try {

        //get data
        const { gender, dateOfBirth, about, contactNumber } = req.body;
        //get userId
        const id = req.user.id;
        //validate the data 
        if (!gender || !contactNumber || !id) {
            return res.status(400).json({
                success: false,
                message: "All field required"
            })
        }
        //find Profile additionalDetails
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const profileId = userDetails.additionalDetails;
        const profileDetail = await Profile.findById(profileId);
        if (!profileDetail) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        //update the profile
        profileDetail.gender = gender;
        profileDetail.dateOfBirth = dateOfBirth;
        profileDetail.about = about;
        profileDetail.contactNumber = contactNumber;
        await profileDetail.save();

        //return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: profileDetail
        })


    } catch (err) {
        console.log("Error while updating profile: ", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });

    }
}

// DELETE THE ACCOUNT
export const deleteAccount = async (req, res) => {
    try {
        //get id
        console.log("priting id: ",req.user.id)
        const id = req.user.id;

        //validate the data
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: true,
                message: "User not found"
            })
        }
        //delete profile
        const deleteTheProfile = await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
        //enrolled user from all enrolled course to delete
        //delete user
        const deleteUserAccount = await User.findByIdAndDelete({ _id: id });
        //return responses
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
            data:deleteUserAccount
        })

    } catch (err) {
        console.log("Error while deleting Account: ", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to delete Account",
        });
    }
}


//getUserDetails
export const getUserDetails = async (req, res) => {
    try {
        //get user details
        const id = req.user.id;
        //validation and get userDetails
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(400).json({
                success:true,
                message:"User not found"
            })
        }
        //return res
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data:userDetails
        })


    } catch (err) {
        console.log("Error while gettingUserDetails: ", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to gettingUserDetails",
        });

    }
}