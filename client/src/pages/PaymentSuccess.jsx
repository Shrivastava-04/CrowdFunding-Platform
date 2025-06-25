import React from 'react'
import { useSearchParams } from "react-router-dom"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
    
    const [searchParams] = useSearchParams();

  return (
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <Navbar/>
        <div className='w-full h-full flex items-center justify-center flex-col'>
            {searchParams.get("success")&&(
                <>
                <h1>Payment Id</h1>
            <h2>{searchParams.get("razorpay_payment_id")}</h2>
                </>
            )}
            {!searchParams.get("success")&&(
                <>
                <h1>Payment Failed</h1>
                </>
            )}
        </div>
      <Footer/>
    </div>
  )
}

export default PaymentSuccess
