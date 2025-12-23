import React from "react";
import { Link } from "react-router-dom";

function Button({ children, active, linkTo }) {
  return (
    <Link to={linkTo}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold 
        ${active 
          ? "bg-yellow-50 text-black shadow-lg shadow-yellow-500/20" 
          : "bg-richblack-800 shadow-lg shadow-richblack-700/50"
        } 
        transition-all duration-200 hover:scale-95`}
      >
        {children}
      </div>
    </Link>
  );
}

export default Button;