import mongoose from "mongoose";

const SubSectionSchema = new mongoose.Schema(
  {
    title:{
        type:String,
        trim:true
    },
    timeDuration:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    videoUrl:{
        type:String,
        trim:true
    }
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SubSection",SubSectionSchema);
