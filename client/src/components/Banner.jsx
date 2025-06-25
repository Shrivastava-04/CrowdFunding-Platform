import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-between mx-5 ">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-8xl mt-20">Empower Ideas. Fuel Dreams.</h1>
        <a
          href="/lend"
          className="text-4xl hover:text-blue-300 hover:scale-110 hover:-translate-y-3 transition-transform bg-gray-200 px-2 py-1 rounded-lg"
        >
          🔵Start a Fund Raiser
        </a>
        <a
          href="/donate"
          className="text-4xl hover:text-blue-300 hover:scale-110 hover:-translate-y-3 transition-transform bg-gray-200 px-2 py-1 rounded-lg"
        >
          ⚪Donate to a Campaign
        </a>
      </div>
      <div className="flex items-center justify-center text-xl w-fit">
        Discover inspiring campaigns and become part of the journey. Whether
        you're starting a project or supporting one, we're building a future
        where everyone has a chance to grow.
      </div>
    </div>
  );
};

export default Banner;
