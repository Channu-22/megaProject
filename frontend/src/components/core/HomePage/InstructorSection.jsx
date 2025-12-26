import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HightLightText from "./HighLightText";
import CallToActionButton from "./Button.jsx";
import { MoveRight } from "lucide-react";

function InstructorSection() {
  return (
    <div className="flex items-center gap-20 mt-16">
      <div className="w-[50%] shadow-[10px_-5px_50px_-5px] shadow-blue-200">
        <img 
        src={Instructor}
         alt="InstructorImage" 
         className="rounded-sm object-contain  shadow-[20px_20px_rgba(255,255,255)]"/>
      </div>
      <div className="flex flex-col gap-8  w-[50%]">
        <h1 className="text-4xl font-bold w-[50%]">
          Become an <HightLightText text={"Instructor"} />
        </h1>
        <p className="text-richblack-300 font-medium text-[16px] w-[80%]">
          Instructors from around the world teach millions of students on
          StudyNotion.We provide the{" "}
          <HightLightText text={"Tools and Skills"} /> to teach what you love.
        </p>

        <div className="w-fit">
             <CallToActionButton active={true} linkTo={"/signup"}>
          <div className="flex gap-3 items-start">
            <p>Start Learning Today</p>
            <MoveRight />
          </div>
        </CallToActionButton>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;
