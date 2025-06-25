import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return <div className="flex flex-col items-center justify-between">
    <Navbar/>
    <div className="flex flex-col min-h-screen items-center justify-center text-5xl gap-10 font-bold ">
      <h1>Email: hrshitsrivastava0@gmail.com</h1>
      <h1>Phone No: +91 7050975641</h1>
    </div>
    <Footer/>
    </div>;
};

export default Contact;
