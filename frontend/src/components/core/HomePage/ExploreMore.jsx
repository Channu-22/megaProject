import React, { useState } from "react";
// import { HomePageExplore } from "../../../data/homepage-explore.js";
import {HomePageExplore} from "../../../data/homepage-explore"
import HighLightText from "./HighLightText";

// import CoursesCard from "./CoursesCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Career paths",
];

function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [course, setcourse] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setcourse(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

//     const setMyCards = (value) => {
//     setCurrentTab(value);
//     const result = HomePageExplore.filter((course) => course.tag === value);
//     setCourses(result[0].courses);
//     setCurrentCard(result[0].courses[0].heading);
//   };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl text-center font-bold ">
        Unlock the <HighLightText text={"Power of Code "} />
      </h1>
      <p className="text-richblack-300 text-[13px] text-center">
        Learn to Build Anything You Can Imagine
      </p>

      <div className="flex gap-3 mt-8 mb-3 bg-richblack-800 text-richblack-300  rounded-full px-3 py-1">
        {tabsName.map((ele, index) => {
          return (
            <div
              className={`text-[14px] flex items-center gap-3 
                        ${
                          currentTab === ele
                            ? "bg-richblack-800 text-richblack-5 font-medium"
                            : "text-richblack-200"
                        } rounded-full transition-all duration-200 px-2 py-3 cursor-pointer  hover:bg-richblack-900 hover:text-richblack-5
                       `}
              key={index}
              onClick={() => (ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* courses card groups */}
      {/* <div className="flex gap-10 items-center justify-center mb-10">
        {
            course.map((element,index) => {
                return (
                   <CoursesCard
                   key={index}
                   cardData={element}
                   currentCard={currentCard}
                   setCurrentCard={setCurrentCard}/>
                )
            })
        }
      </div> */}
    </div>
  );setMyCard
}

export default ExploreMore;
