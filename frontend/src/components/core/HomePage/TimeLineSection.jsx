import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png";

const timeLine = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

function TimeLineSection() {
  return (
    <div>
      <div className="flex items-center gap-12 ">
        <div className="flex flex-col gap-5 w-[45%]">
          {timeLine.map((element, index) => {
            return (
              <div className="flex gap-6 " key={index}>
                <div className="w-[50px] h-[50px] bg-white flex items-center">
                  <img src={element.Logo} alt={`images ${index}`} />
                </div>

                <div className="flex flex-col gap-2 ">
                  <h1 className="font-semibold text-[18px] ">
                    {element.heading}
                  </h1>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative w-[50%] shadow-2xl shadow-blue-200">
          <img
            src={timeLineImage}
            alt="timeLineImage"
            className="object-cover rounded-md shadow-pure-greys-300 "
          />

          <div className="absolute bg-caribbeangreen-700 flex gap-3 uppercase text-white py-5 translate-x-[35%] translate-y-[-45px]">
            <div className="flex gap-3 border-r items-center border-caribbeangreen-200 px-7">
              <p className=" text-3xl font-bold">10</p>
              <p className="text-sm text-caribbeangreen-300 w-[75px]">year of experience</p>
            </div>
            <div className="flex gap-3  items-center  ">
              <p className=" text-3xl font-bold">250</p>
              <p className="text-sm text-caribbeangreen-300  w-[75px]">type of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLineSection;
