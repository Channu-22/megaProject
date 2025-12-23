import React from "react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import HightLightText from "../components/core/HomePage/HightLightText.jsx";
import CallToActionButton from "../components/core/HomePage/Button.jsx"

function Home() {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to="/signup">
         <div className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all 
  duration-200 hover:scale-95 w-fit mt-16 p-1 shadow-lg shadow-richblack-700/50">
  <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
    <p>Become an Instructor</p>
    <MoveRight />
  </div>
</div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with 
          <HightLightText text="Coding Skills"/>
        </div>

        <div className="w-[58%] text-center text-[14px] font-bold text-richblack-200 mt-4">
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CallToActionButton active={true} linkTo={"/signup"}>Learn More</CallToActionButton>
           <CallToActionButton active={false} linkTo={"/login"}>Book a Demo</CallToActionButton>
        </div>
      </div>
      {/* section 2 */}
      {/* section 3 */}
      {/* section 4 */}
    </div>
  );
}

export default Home;
