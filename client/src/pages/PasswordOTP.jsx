import React, { useState } from 'react'
import {FaCar, FaCarSide} from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { userId } from './ForgotPassword.jsx';

export default function PasswordOTP() {
    
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [formData, setFormData] = useState([]);
    const navigate = useNavigate();
    const [errorMessage,setMessage] = useState('');
  
    const handleChange = (e) =>{
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        setLoading(true)
        const res = await fetch(`/api/auth/verifyOTP/${userId}`, 
          {
            method: 'POST',
            headers:{
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData),
          }
        );
       
        const data = await res.json();
        if(data.status !== 'verified'){
            setLoading(false);
            setMessage(data.message);
            setError(true);
            return;
        }
        setLoading(false)
        navigate('/newPassword');
      } catch (error) {
        setLoading(false);
        console.log(error);
        setMessage(error.message);
        setError(true);
        
      }
    }


  return (
    <section className='max-w-lg pt-32 mx-auto text-center'>
  
      <div className='shadow shadow-red-700 p-4 bg-blue-200'>
  
        <h1 className='text-center text-2xl font-bold m-6 underline-offset-6 underline underline-offset-8'>Enter your code</h1>
  
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>

            <input type="password" placeholder='Code' className='border p-3 rounded-md border-cyan-950' id='otp' onChange={handleChange}/>

          <button disabled={loading} className='border p-3 bg-yellow-500 rounded-md text-2xl text-white hover:text-black cursor-pointer hover:opacity-80
          disabled:opacity-60 w-full'>{loading?'Verifying...' : 'Continue'}</button>
  
  
        </form>
  
        <div className='flex flex-col gap-2 mt-5'>

        

        <p className='flex items-center'> Did not recieve a verification code? <Link to = "/forgotPassword"><span className='text-blue-500 cursor-pointer hover:underline ml-2'>resend</span></Link></p>
        </div>
        {error && <p className='text-red-700 mt-5'>{errorMessage}</p>}
        <h1 className='font-bold text-xl flex flex-wrap items-center mx-10 sm:mx-28 mt-12'>
         
                  <span className='text-red-500'>ISU</span>
  
                  <FaCar className='items-center'/>
  
                  <span className='text-yellow-500'>pooling _ _ _ _ _ _</span>
  
                  <FaCarSide className='items-center'/>
  
                  <p className='text-sm mt-3'>"Connecting students, saving miles, sharing smiles."</p>
                
        </h1>
        </div>
        
        </section>
  )
}