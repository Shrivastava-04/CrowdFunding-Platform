import React from 'react'
import axios from "axios";

import { useState } from 'react';
import { useEffect } from 'react';
import Cards from './Cards';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    
    useEffect(()=>{
        const getCampaigns = async ()=>{
            try {
                const res = await axios.get("http://localhost:4001/campaign/campaigns");
                const camps = res.data.slice(0,6)
                setCampaigns(camps);
            } catch (error) {
                console.log(error)
            }
        }
        getCampaigns();
    },[])
  return (
    <div className='flex flex-col items-center'>
      <div className="mt-20 text-4xl">
        Thousands are Fund Raising online on Crowd-Fund
      </div>
      <div className="flex items-center flex-wrap gap-y-3 gap-x-2 justify-center">
        {campaigns.map((item)=>(
            <Cards item = {item} key={item._id}/>
        ))}
    </div>  
    </div>
  )
}

export default Campaigns
