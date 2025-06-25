import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Campaigns from "../components/Campaigns";
import Footer from "../components/Footer";

const home = () => {
  return (
    //welcome to home page
    <div className="min-h-full min-w-full flex flex-col items-center">
      <Navbar />
      <Banner />
      <Campaigns/>
      <Footer/>
    </div>
  );
};

export default home;
