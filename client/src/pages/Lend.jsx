import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import LendPageCard from "../components/LendPageCard";

const Lend = () => {
  const user_id = localStorage.getItem("user_id")?localStorage.getItem("user_id"):null;
  const [user,setUser] = useState();
  const Base_Url = import.meta.env.VITE_BASE_URL;
  useEffect(()=>{
    const getUser = async ()=>{
      try {
        if(user_id){
          const response = await axios.get(`${Base_Url}/user/getuserbyid`,{params:{_id:user_id}})
          setUser(response.data.user[0])
          const userr = response.data.user[0];
        }
        else{
          console.log("no user Id")
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  },[])
  if(user&&user.role!=="Backer"){
    return (<div className="flex flex-col items-center justify-center">
    <Navbar/>
    <div className="min-h-screen w-full flex items-center justify-center">
      <LendPageCard user={user} />
    </div>
    <Footer/>
    </div>);
  }
  else{
    return <div>
      <Navbar/>
      <div className="w-full min-h-screen flex items-center justify-center ">              
        You have to be a creator to make a campaign Please Login
      </div>
      <Footer/>
    </div>
  }
};

export default Lend;
