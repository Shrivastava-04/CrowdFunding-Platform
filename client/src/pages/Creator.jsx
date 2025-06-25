import React from 'react'
import DashboardCard from '../components/DashboardCard'
import { FaHourglassEnd, FaIndianRupeeSign, FaUser } from 'react-icons/fa6'
import { LuActivity } from 'react-icons/lu'
import ListCardCampaign from '../components/ListCardCampaign'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Creator = ({user}) => {
  const [campaign,setCampaign] = useState([]);
  const Base_Url = import.meta.env.VITE_BASE_URL;
  useEffect(()=>{
    const getCampaign = async()=>{
      const camps = []
      for(const campaign_id of user.campaignCreated){
        const res = await axios.get(`${Base_Url}/campaign/campaignfindbyid`,{params:{_id:campaign_id}})
        console.log(res.data.camp);
        camps.push(res.data.camp);
      }
      setCampaign(camps);
    }
    getCampaign()
  },[])
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <DashboardCard title="Total Campaigns Created" value={user.campaignCreated.length} icon={FaUser} />
        <DashboardCard title="Active Campaigns" value={user.campaignCreated.length} icon={LuActivity} textColor="text-blue-600" />
        <DashboardCard title="Pending Campaigns" value="Not defined" icon={FaHourglassEnd} textColor="text-yellow-500" />
        <DashboardCard title="Funds Raised" value={user.fundRaised} icon={FaIndianRupeeSign} textColor="text-green-600" />
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
              {campaign.map((camp)=>{
              return (<ListCardCampaign campaign={camp} key={camp._id} />)
          })}
          </div>
      </div>
    </div>
  )
}

export default Creator
