import React from 'react'
import HighLightText from './HighLightText'
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.png";
import compareWithOther from "../../../assets/Images/Compare_with_others.png";
import CallTOActionButton from "./Button.jsx"


function LearningLaguangeSection() {
  return (
    <div className="mt-32 mb-14">
        <div className="flex flex-col gap-5 items-center">

            <div className="text-4xl font-bold ">
                <h1>Your swiss knife for <HighLightText text={"learning any language"}/></h1>
            </div>

            <p className="font-medium text-center  text-richblack-600 w-[60%]">Using spin making learning multiple languages easy, with 20+ languages realistic voice-over, progress tracking, custom schedule and more</p>

            <div className="flex items-center justify-center">
                <img src={knowYourProgress} alt="knowYourProgressImage" className="object-contain -mr-32" />
                <img src={compareWithOther} alt="compareWithOtherImage" className="object-contain"/>
                <img src={PlanYourLessons} alt="PlanYourLessonsImage"  className="object-contain -ml-32"/>
            </div>
            <CallTOActionButton active={true} linkTo={"/signup"} className="">
              Learn More
            </CallTOActionButton>

        </div>
    </div>
  )
}

export default LearningLaguangeSection