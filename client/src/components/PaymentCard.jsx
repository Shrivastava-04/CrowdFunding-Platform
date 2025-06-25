import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import { useSearchParams } from 'react-router-dom';

const PaymentCard = ({campaign}) => {
  const user_id = localStorage.getItem("user_id")||null;
  const [currUser,setCurrUser] = useState();
  const [loading, setLoading] = useState(false);
  const Base_Url = import.meta.env.VITE_BASE_URL;
  
  useEffect(()=>{
    const getUser = async ()=>{
      if(user_id){
        const {data:{user}} = await axios.get(`${Base_Url}/user/getuserbyid`,{params:{_id:user_id}});
        setCurrUser(user[0]);
      }
      // else{
      //   // alert("please login first");
      //   // toast.error("Please login or create an account to make donation")
      // }
    }
    getUser();
  },[])
  
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = async(data)=>{
    const res = await axios.post(`${Base_Url}/pay/checkout`,data);
    const order = res.data.order;
    const {data:{key}} = await axios.get(`${Base_Url}/apikey`);
    const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Harshit Shrivastava",
        description: "Campaign Donation",
        // image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        handler: async function(response){
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          if(currUser&&campaign){
            setLoading(true);
            try {
              const res = await axios.post(`${Base_Url}/pay/paymentverification`, {
            razorpay_payment_id,  
            razorpay_order_id,
            razorpay_signature,
            currUser,
            campaign,
          });
          if (res.data.status === true) {
            toast.success("Payment Successfull")
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.error("Payment Failed")
          }
            } catch (error) {
              console.log("An error occured:", error)
            }
            finally{
              setLoading(false);
            }
          } 
        },
        prefill: {
            name: currUser?currUser.name:"",
            email: currUser?currUser.email:"",
            contact: currUser?currUser.phoneNumber:"",
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#528FF0"  
        }
    };
    const razor = new window.Razorpay(options);
      razor.open();
  }

  return (
    <>
    {/* Full-screen loading overlay */}
    {loading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 opacity-35">
        <div className="text-black text-5xl font-bold">
          Processing Payment...
        </div>
        {/* You can add a spinner here for better UX */}
      </div>
    )}

    <form 
      onSubmit={handleSubmit(onSubmit)}
    className='p-5 rounded-xl shadow-md bg-gray-300 w-fit h-fit gap-5 flex flex-col items-center justify-evenly hover:shadow-lg transition-all duration-200'>
      <div><Toaster/></div>
      <div className="relative">
        <input
          autoComplete="off"
          id="amount"
          name="amount"
          type="text"
          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          placeholder="Name"
          {...register("amount", { required: true })}
        />
        <label
          htmlFor="amount"
          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
        >
          Enter the amount to donate
        </label>
      </div>
      <button
        className={`rounded-md px-2 py-1 text-white ${
          currUser ? "bg-cyan-500 hover:bg-cyan-600" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!currUser}
      >
        Donate
      </button>
      {!currUser && (
        <p className="text-black text-sm mt-1">
          Please login to donate.
        </p>
      )}
      {/* <button className="bg-cyan-500 text-white rounded-md px-2 py-1">
          Donate
      </button> */}
    </form>
</>  )
}

export default PaymentCard
