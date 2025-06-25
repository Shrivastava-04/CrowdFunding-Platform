import axios from 'axios';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";  

const ListCard = ({user}) => {
  const Base_Url = import.meta.env.VITE_BASE_URL;

  const handleClick = async()=>{
    const res = await axios.delete(`${Base_Url}/user/deleteuser/${user._id}`, {params:{id:user._id}})
    toast.success(res.data.message)
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }


  return (
    <div className='p-5 rounded-xl shadow-md bg-gray-300 w-full h-16 flex items-center hover:shadow-lg transition-all duration-200'>
      <Toaster/>
        <div className='w-1/12 flex items-center justify-center'>
            <img src={user?user.image:""} alt="Profile" className="rounded-full w-8 h-8 object-cover" />
        </div>
        <h2 className='w-4/12 text-center'>{user?user.name:"Name"}</h2>
        <h4 className='w-4/12 text-center'>{user?user.email:"Email"}</h4>
        {user&&(
            <h4 className='w-2/12 text-center'>
                {user.role==='Creator'?user.fundRaised:user.fundDonated}
            </h4>
        )}
        <button className='w-1/12 cursor-pointer' onClick={handleClick}>
        <MdDelete />
        </button>
    </div>
  )
}

export default ListCard
