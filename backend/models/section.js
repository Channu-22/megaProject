import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    sectionSchema: {
      type: String,
      trim: true,
    },
    subSection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "SubSection",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Section", sectionSchema);
