import React, { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import { FaHourglassEnd, FaIndianRupeeSign, FaUser } from 'react-icons/fa6'
import { LuActivity } from 'react-icons/lu'
import ListCardCampaign from '../components/ListCardCampaign'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'

const Backer = ({user}) => {
  const [campaignsList, setCampaignList] = useState();
  const Base_Url = import.meta.env.VITE_BASE_URL;
  useEffect(()=>{
    const getCampaign = async()=>{
      const camps = []
      for(const campaign of user.campaignDonated){
        const res = await axios.get(`${Base_Url}/campaign/campaignfindbyid`,{params:{_id:campaign.campaignId}})

        camps.push({camps:res.data.camp,amountDonated:campaign.amountDonated});
      }
      setCampaignList(camps);
    }
    getCampaign();
  },[])
  function formatDateToDDMMYY(dateString) {
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        return `${dd}-${mm}-${yy}`;
    }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            <DashboardCard title="Total Campaigns Donated" value={user.campaignDonated.length} icon={FaUser} />
            <DashboardCard title="Active Campaigns" value={user.campaignDonated.length} icon={LuActivity} textColor="text-blue-600" />
            <DashboardCard title="Completed Campaigns" value="7" icon={FaHourglassEnd} textColor="text-yellow-500" />
            <DashboardCard title="Funds Donated" value={user.fundDonated} icon={FaIndianRupeeSign} textColor="text-green-600" />
      </div>   
      <div className='flex flex-col items-center justify-center w-full gap-5 p-5 rounded-xl shadow-md ${bgColor} hover:shadow-lg  transition-all duration-200'>
          <h4 className="text-xl font-medium text-gray-500">Campaigns you donated</h4>
          <div className='flex justify-evenly items-center w-full pr-10 pl-5 text-center bg-gray-300 rounded-xl py-2'>
              <h2 className='w-1/6'>Name</h2>
              <h2 className='w-1/6'>Category</h2>
              <h2 className='w-1/6'>Goal</h2>
              <h2 className='w-1/6'>Raised</h2>
              <h2 className='w-1/6'>Deadline</h2>
              <h2 className='w-1/6'>You Donated</h2>
          </div>
          <div className='w-full gap-5 flex flex-col max-h-60 overflow-y-auto'>
              {campaignsList&&campaignsList.map((campaign)=>{
              // return (<ListCardCampaign campaign={campaign} key={campaign._id} />)
              return(
                <div className='p-5 rounded-xl shadow-md bg-gray-300 w-full h-16 flex items-center justify-evenly hover:shadow-lg transition-all duration-200'>
                  <h4 className='w-1/6 text-center'>{campaign?campaign.camps.title:"Name"}</h4>
                  <h4 className='w-1/6 text-center'>{campaign?campaign.camps.category:"Category"}</h4>
                  <h4 className='w-1/6 text-center'>{campaign?campaign.camps.goal:"goal"}</h4>
                  <h4 className='w-1/6 text-center'>{campaign?campaign.camps.amountRaised:"Amount Raised"}</h4>
                  <h4 className='w-1/6 text-center'>{campaign?formatDateToDDMMYY(campaign.camps.deadline):"Deadline"}</h4>
                  <h4 className='w-1/6 text-center'>{campaign?campaign.amountDonated:"Creator"}</h4>
              </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}

export default Backer
