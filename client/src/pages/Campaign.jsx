import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSearchParams } from 'react-router-dom'
import axios from "axios";

const Campaign = () => {

    const [searchParams] = useSearchParams();
    const [campaign,setCampaign] = useState();
    useEffect(()=>{
        const getCampaign = async ()=>{
            const id = searchParams.get("id");
            const camp = await axios.get(`http://localhost:4001/campaign/campaignfindbyid?_id=${id}`);
            setCampaign(camp.data);
        }
        getCampaign();
    },[])

  return (
    <div className='flex flex-col items-center justify-center'>
      <Navbar/>
      <div className='min-h-screen mt-10 pt-10'>
        This Campaign page is under construction
      </div>
      <Footer/>
    </div>
  )
}

export default Campaign