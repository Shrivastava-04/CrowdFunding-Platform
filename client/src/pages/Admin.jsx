import React, { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import { FaUser, FaIndianRupeeSign, FaHourglassEnd } from "react-icons/fa6";
import { LuActivity } from "react-icons/lu";
import axios from 'axios';
import ListCard from '../components/ListCard';
import ListCardCampaign from '../components/ListCardCampaign';

const Admin = ({user}) => {
    const [userList, setUserList] = useState([]);
    const [backerList, setBackerList] = useState([]);
    const [creatorList, setCreatorList] = useState([]);
    const [campaignList, setCampaignList] = useState([]);
    const Base_Url = import.meta.env.VITE_BASE_URL;

    useEffect(()=>{
        const getCampaignList = async()=>{
            try {
            const response = await axios.get(`${Base_Url}/campaign/campaigns`)
            setCampaignList(response.data);
        } catch (error) {
            console.log(error)
        }
        }
        getCampaignList();
    },[])

    useEffect( ()=>{
        const getUserList = async()=>{
            try {
            const response = await axios.get(`${Base_Url}/user/getalluser`)
            setUserList(response.data.users);
            setBackerList(response.data.users.filter(user=>user.role==="Backer"))
            setCreatorList(response.data.users.filter(user=>user.role==="Creator"))
            
        } catch (error) {
            console.log(error);
        }
        }
        getUserList();
    },[])
    const fundraised = ()=>{
        var totalFundRaised = 0;
        userList.forEach((user)=>{
            totalFundRaised = totalFundRaised + user.fundDonated;
        })

        return totalFundRaised
    }
    const activeCampaigns = ()=>{
        return campaignList.length
    }

    const totalGoal = ()=>{
        var totalGoalAmount = 0;
        campaignList.forEach((campaign)=>{
            totalGoalAmount = totalGoalAmount + campaign.goal;
        })
        return totalGoalAmount
    }

  return (
  <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            <DashboardCard title="Total Users" value={userList.length-1} icon={FaUser} />
            <DashboardCard title="Funds Raised" value={fundraised()} icon={FaIndianRupeeSign} textColor="text-green-600" />
            <DashboardCard title="Total Goals" value={totalGoal()} icon={FaHourglassEnd} textColor="text-yellow-500" />
            <DashboardCard title="Active Campaigns" value={activeCampaigns()} icon={LuActivity} textColor="text-blue-600" />
        </div>   
        <div className='flex justify-between px-10 gap-2'>
            <div className='flex flex-col items-center justify-center w-full gap-5 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200'>
                <h4 className="text-xl font-medium text-gray-500">Creators</h4>
                <div className='flex justify-evenly items-center w-full pr-10 pl-5 text-center bg-gray-300 rounded-xl py-2'>
                    <h2 className='w-1/12'>Profile</h2>
                    <h2 className='w-4/12'>Name</h2>
                    <h2 className='w-4/12'>Email</h2>
                    <h2 className='w-2/12'>Amount Raised</h2>
                    <h2 className='w-1/12'>Delete User</h2>
                </div>
                <div className='w-full gap-5 flex flex-col max-h-60 overflow-y-auto'>
                    {creatorList.map((creator)=>{
                    return (<ListCard user={creator} key={creator._id} />)
                    })}
                </div>
            </div>
            <div className='flex flex-col items-center justify-center w-full gap-5 p-5 rounded-xl shadow-md ${bgColor} hover:shadow-lg transition-all duration-200'>
                <h4 className="text-xl font-medium text-gray-500">Backers</h4>
                <div className='flex justify-evenly items-center w-full pr-10 pl-5 text-center bg-gray-300 rounded-xl py-2'>
                    <h2 className='w-1/12'>Profile</h2>
                    <h2 className='w-4/12'>Name</h2>
                    <h2 className='w-4/12'>Email</h2>
                    <h2 className='w-2/12'>Amount Donated</h2>
                    <h2 className='w-1/12'>Delete User</h2>
                </div>
                <div className='w-full gap-5 flex flex-col max-h-60 overflow-y-auto'>
                    {backerList.map((backer)=>{
                    return (<ListCard user={backer} key={backer._id} />)
                })}
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full gap-5 p-5 rounded-xl shadow-md ${bgColor} hover:shadow-lg  transition-all duration-200'>
            <h4 className="text-xl font-medium text-gray-500">Active Campaigns</h4>
            <div className='flex justify-evenly items-center w-full pr-10 pl-5 text-center bg-gray-300 rounded-xl py-2'>
                <h2 className='w-2/12'>Name</h2>
                <h2 className='w-2/12'>Category</h2>
                <h2 className='w-1/12'>Goal</h2>
                <h2 className='w-2/12'>Raised</h2>
                <h2 className='w-2/12'>Deadline</h2>
                <h2 className='w-2/12'>Creator Id</h2>
                <h2 className='w-1/12'>Delete Campaign</h2>
            </div>
            <div className='w-full gap-5 flex flex-col max-h-60 overflow-y-auto'>
                {campaignList.map((campaign)=>{
                return (<ListCardCampaign campaign={campaign} key={campaign._id} />)
            })}
            </div>
        </div>
  </div>
  )
}

export default Admin
