import React from "react";
import "./home.css"
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import HightLightText from "../components/core/HomePage/HightLightText.jsx";
import CallToActionButton from "../components/core/HomePage/Button.jsx";
import Banner from "../assets/Images/Banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks.jsx";

function Home() {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to="/signup">
          <div
            className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all 
  duration-200 hover:scale-95 w-fit mt-16 p-1 shadow-lg shadow-richblack-700/50"
          >
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <MoveRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HightLightText text="Coding Skills" />
        </div>

        <div className="w-[58%] text-center text-[14px] font-bold text-richblack-200 mt-4">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* two button */}
        <div className="flex flex-row gap-7 mt-8">
          <CallToActionButton active={true} linkTo={"/signup"}>
            Learn More
          </CallToActionButton>
          <CallToActionButton active={false} linkTo={"/login"}>
            Book a Demo
          </CallToActionButton>
        </div>

        {/* video frame */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-[75%]">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div className="w-[85%]">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-bold">
                Unlock your <HightLightText text="coding potential " />
                with our online courses.
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              text: "Try it yourself",
              active: true,
              linkTo: "/signup",
            }}
            ctabtn2={{
              text: "Learn More",
              active: false,
              linkTo: "/login",
            }}
            codeBlock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="#">Header</a></h1>\n<nav>\n<a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
            codeColor={"text-yellow-25"}
            backGroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* code section 2 */}
        <div className="w-[85%]">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-bold">
                Start {" "}
                <HightLightText text="coding in seconds. " />
               
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              text: "Continue Lesson",
              active: true,
              linkTo: "/signup",
            }}
            ctabtn2={{
              text: "Learn More",
              active: false,
              linkTo: "/login",
            }}
            codeBlock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="#">Header</a></h1>\n<nav>\n<a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
            codeColor={"text-yellow-25"}
            backGroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
      </div>
      {/* section 2 */}
      {/* section 3 */}
      {/* section 4 */}
    </div>
  );
}

export default Home;
