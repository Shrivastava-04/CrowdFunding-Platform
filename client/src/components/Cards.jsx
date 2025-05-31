import React from "react";
import image from "../assets/Screenshot 2025-05-31 224402.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {Link} from "react-router-dom"
import "react-circular-progressbar/dist/styles.css";

const Cards = (data) => {
    const item = data.item;
  const percentage = (item.amountRaised*100)/(item.goal);
//   console.log(item.item)
// console.log(item._id)

  return (
    <Link to={`/campaign?id=${item._id}`} className="mt-4 my-3 p-3 cursor-pointer">
        <div className="bg-base-100 w-92 shadow-xl hover:scale-105 duration-200 ">
            <figure>
                <img src={image} alt="Shoes" />
            </figure>
            <div className="flex flex-col items-center justify-center">
                <h2 className=" text-2xl ">
                    {item.title}
                </h2>
                <div className="flex justify-evenly items-center gap-10 pb-4">
                    <div className="flex items-center justify-around gap-10 pl-2">
                        <CircularProgressbar
                            className="max-w-16"
                            value={percentage}
                            text={`${percentage}%`}
                            styles={buildStyles({
                            strokeLinecap: "round",
                            textSize: "20px",
                            pathColor: `rgba(22, 219, 97, ${percentage / 100})`,
                            textColor: "#f88",
                            trailColor: "#d6d6d6",
                            backgroundColor: "#3e98c7",})}
                        />
                        <div>
                            <span className="flex flex-col justify-center item-center text-xs text-gray-500">
                                Raised
                            </span>
                            <span>{item.amountRaised}</span>
                        </div>
                    </div>
                    <div className=" p-3 border-l-2 border-l-gray-300 flex flex-col items-center justify-start">
                        <span className="flex flex-col justify-center item-center text-xs text-gray-500">Created By</span>
                        <span>Harshit</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default Cards;
