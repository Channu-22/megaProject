import React from "react";
import "./home.css";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import HighLightText from "../components/core/HomePage/HighLightText.jsx";
import CallToActionButton from "../components/core/HomePage/Button.jsx";
import Banner from "../assets/Images/Banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks.jsx";
import TimeLineSection from "../components/core/HomePage/TimeLineSection.jsx";
import LearningLaguangeSection from "../components/core/HomePage/LearningLaguangeSection.jsx";
import InstructorSection from "../components/core/HomePage/InstructorSection.jsx";
import Footer from "../components/common/Footer.jsx";
import ExploreMore from "../components/core/HomePage/ExploreMore.jsx";

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
          <HighLightText text="Coding Skills" />
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
                Unlock your <HighLightText text="coding potential " />
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
              <div className="text-4xl font-bold w-[250px]">
                Start <HighLightText text="coding in seconds. " />
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
        <ExploreMore/>
      </div>
      {/* section 2 */}

      {/* two button with white bg */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homePage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 justify-center mx-auto">
            <div className="h-[150px]"> </div>
            <div className="flex gap-5 items-center justify-between ">
              <CallToActionButton active={true} linkTo={"/signup"}>
                <div className="flex items-center gap-3 ">
                  Explore Full Catalog
                  <MoveRight />
                </div>
              </CallToActionButton>
              <CallToActionButton active={false} linkTo={"/signup"}>
                <div className="text-white">Learn More</div>
              </CallToActionButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto bg-pure-greys-5 ">
          <div className="flex  gap-10 mt-[90px] mb-10 ml-20">
            <div className="text-4xl font-semibold w-[48%]">
              Get the skills you need for a{" "}
              <HighLightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col gap-7 items-start w-[40%]">
              <p className="text-[16px]">
                The modern StudyNotion is the dictates its own terms.Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CallToActionButton active={true} linkTo={"/signup"}>
                Learn More
              </CallToActionButton>
            </div>
          </div>
          <TimeLineSection />
          <LearningLaguangeSection />
        </div>
      </div>

      {/* Become an instructor and reviews */}
      {/* section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col gap-8 items-center justify-between bg-richblack-900 text-white">
        <InstructorSection />

        <h2 className="font-bold text-center text-4xl">
          Review from other learners
        </h2>
        {/* review slider */}
      </div>

      {/* section 4 */}
      <Footer/>
    </div>
  );
}

export default Home;
