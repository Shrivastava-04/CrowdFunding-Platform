import React from 'react'
import { FaUser, FaIndianRupeeSign, FaHourglassEnd } from "react-icons/fa6";
import { LuActivity } from "react-icons/lu";


const DashboardCard = ({title,value,icon:Icon, bgColor="bg-white", textColor="text-black"}) => {
  return (
    <div className={`p-5 rounded-xl shadow-md ${bgColor} flex items-center justify-between hover:shadow-lg transition-all duration-200`}>
      <div>
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <h2 className={`text-2xl font-bold ${textColor}`}>{value}</h2>
      </div>
      <div className="text-gray-400">
        <Icon size={32} />
      </div>
    </div>
  )
}

export default DashboardCard
