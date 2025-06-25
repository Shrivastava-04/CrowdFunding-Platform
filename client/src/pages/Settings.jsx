import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import Admin from './Admin';
import Creator from './Creator';
import Backer from './Backer';
import EditProfile from '../components/EditProfile';

const Settings = () => {
  const user_id = localStorage.getItem("user_id")?localStorage.getItem("user_id"):null;
    const [user,setUser] = useState(null);
    const [userState, setUserState] = useState(false);
    const Base_Url = import.meta.env.VITE_BASE_URL;

    useEffect(()=>{
      const fetchUser = async ()=>{
        try {
          if(user_id){
            const response = await axios.get(`${Base_Url}/user/getuserbyid`,{params:{_id:user_id}});
            setUser(response.data.user[0]);
            setUserState(true);
          }
          else{
            setUserState(false);
          }
        } catch (error) {
          console.log(error)
          setUserState(false);
        }
      }
      fetchUser();
    },[user_id])
  
  return(
    <div> 
      <Navbar/>
      {user&&(<EditProfile user={user}/>)}
      {!user&&(
        <div>
          Please Login or Sign Up first
        </div>
      )}
      <Footer/>
    </div>
  )
}

export default Settings
