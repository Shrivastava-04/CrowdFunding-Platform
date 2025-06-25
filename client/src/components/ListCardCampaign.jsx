import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const ListCardCampaign = ({campaign}) => {

  const location = useLocation();
  const Base_Url = import.meta.env.VITE_BASE_URL;

  const [user,setUser] = useState();
  useEffect(()=>{
    const getUser = async()=>{
      const res = await axios.get(`${Base_Url}/user/getuserbyid`,{params:{_id:campaign.creatorId}})
      setUser(res.data.user[0]);
    }
    getUser();
  },[])

  const handleClick = async ()=>{
    const res = await axios.delete(`${Base_Url}/campaign/campaigndelete/${campaign._id}`,{params:{id:campaign._id}});
    toast.success(res.data.message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }


  function formatDateToDDMMYY(dateString) {
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        return `${dd}-${mm}-${yy}`;
    }
  return (
    <div className='p-5 rounded-xl shadow-md bg-gray-300 w-full h-16 flex items-center justify-evenly hover:shadow-lg transition-all duration-200'>
        <h4 className='w-2/12 text-center'>{campaign?campaign.title:"Name"}</h4>
        <h4 className='w-2/12 text-center'>{campaign?campaign.category:"Category"}</h4>
        <h4 className='w-1/12 text-center'>{campaign?campaign.goal:"goal"}</h4>
        <h4 className='w-2/12 text-center'>{campaign?campaign.amountRaised:"Amount Raised"}</h4>
        <h4 className='w-2/12 text-center'>{campaign?formatDateToDDMMYY(campaign.deadline):"Deadline"}</h4>
        <h4 className='w-2/12 text-center'>{user?user.name:"Creator"}</h4>
        {location.pathname!=="/donate"&&<button className="w-1/12 cursor-pointer flex items-center justify-center" onClick={handleClick}>
            <MdDelete />
        </button>}
    </div>
  )
}

export default ListCardCampaign
