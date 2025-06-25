import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListCardCampaign from "../components/ListCardCampaign";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Donate = () => {
  const [campaign,setCampaign] = useState([]);
  const Base_Url = import.meta.env.VITE_BASE_URL;
  useEffect(()=>{
    const getCampaign = async()=>{
      const res = await axios.get(`${Base_Url}/campaign/campaigns`)
      setCampaign(res.data);
    }
    getCampaign()
  },[])

  const handleClick = ()=>{

  }
  const user_id = localStorage.getItem("user_id")?localStorage.getItem("user_id"):null;
  const [user,setUser] = useState();
  useEffect(()=>{
    const getUser = async ()=>{
      try {
        if(user_id){
          const response = await axios.get(`${Base_Url}/user/getuserbyid`,{params:{_id:user_id}})
        setUser(response.data.user[0])
          const userr = response.data.user[0];
        }
        // else{
        //   // console.log("no user Id")
        //   // toast.error("Please login or Sign up to Donate")
        // }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  },[])

  return (
    <div className="flex flex-col items-center justify-center relative">
  {/* Navbar */}
  <div className="w-full fixed top-0 left-0 z-50 bg-white/30 backdrop-blur-md shadow-md">
    <Navbar />
  </div>

  {/* Table Header Row (blurred) */}
  <div className="w-full fixed top-[64px] z-40 bg-white/30 backdrop-blur-md shadow-sm px-16 py-2">
    <div className="flex justify-around items-center text-center text-xl font-bold gap-10">
      <h2 className='w-1/6'>Name</h2>
      <h2 className='w-1/6'>Category</h2>
      <h2 className='w-1/6'>Goal</h2>
      <h2 className='w-1/6'>Raised</h2>
      <h2 className='w-1/6'>Deadline</h2>
      <h2 className='w-1/6'>Creator</h2>
    </div>
  </div>

  {/* Main Scrollable Content */}
  <div className="w-full mt-[140px] flex flex-col gap-5 px-5">
    {campaign.map((campaign) => (
      <Link to={`/campaign?id=${campaign._id}`} key={campaign._id}>
        <ListCardCampaign onClick={handleClick} campaign={campaign}  />
      </Link>
    ))}
  </div>

  <Footer />
</div>

  )
};

export default Donate;
