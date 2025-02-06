import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = () => {
  return (
    <div className="text-[36px] text-center font-bold text-richblack-400 w-[1200px] leading-[56px]">
      “ We are passionate about revolutionizing the way we learn. Our innovative
      platform
      <HighlightText text={"combines technology"} />
      <span className="text-brown-200"> expertise</span>, and community to
      create an
      <span className="text-brown-200">
        {" "}
        unparalleled educational experience.”
      </span>
    </div>
  );
};

export default Quote;
