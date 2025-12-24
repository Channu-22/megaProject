import React from "react";
import CallToActionButton from "./Button.jsx";
import HightLightText from "./HightLightText.jsx";
import { MoveRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({
  heading,
  subHeading,
  position,
  ctabtn1,
  ctabtn2,
  codeBlock,
  backGroundGradient,
  codeColor,
}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* section 1 */}
      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold text-[14px]">
          {subHeading}
        </div>
        <div className="flex mt-7 gap-7">
          <CallToActionButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
            <div className="flex items-center gap-2">
              {ctabtn1.text}
              <MoveRight />
            </div>
          </CallToActionButton>

          <CallToActionButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
            {ctabtn2.text}
          </CallToActionButton>
        </div>
      </div>

      {/* section 2 */}
      <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
        {backGroundGradient}

        {/* Line Numbers */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold leading-[18px] sm:leading-6">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Code Content */}
        <div
          className={`w-[90%] flex flex-col font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeBlock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              lineHeight: "inherit",
            }}
            omitDeletionAnimation={true}
            
          />
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks;
