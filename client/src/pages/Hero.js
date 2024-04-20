import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full">
      <img
        src="https://krock.io/wp-content/uploads/2022/05/request-for-approval-cover.png"
        className="w-full h-[400px] object-contain "
      />
      <div className="absolute inset-0 bg-black opacity-30 "></div>
    </div>
  );
};

export default Hero;
