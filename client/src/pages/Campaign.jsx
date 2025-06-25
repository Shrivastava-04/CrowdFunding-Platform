import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSearchParams } from 'react-router-dom'
import axios from "axios";
import CampaignPageCard from '../components/CampaignPageCard';
import PaymentCard from '../components/PaymentCard';

const Campaign = () => {

    const [searchParams] = useSearchParams();
    const [campaign,setCampaign] = useState();
    const Base_Url = import.meta.env.VITE_BASE_URL;
    useEffect(()=>{
        const getCampaign = async ()=>{
            const id = searchParams.get("id");
            const camp = await axios.get(`${Base_Url}/campaign/campaignfindbyid?_id=${id}`);
            setCampaign(camp.data.camp);
        }
        getCampaign();
    },[])

  return (
    <div className='flex flex-col items-center justify-center'>
      <Navbar/>
      <div className='min-h-fit flex justify-evenly w-full px-20 gap-10 py-5'>
        <CampaignPageCard campaign={campaign}/>
        <PaymentCard campaign={campaign}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Campaign