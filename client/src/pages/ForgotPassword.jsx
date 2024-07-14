import React, { useEffect, useState } from 'react'
import {FaCar, FaCarSide} from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'

export var userId = '';

export default function ForgotPassword() {
  const [formData, setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage,setMessage] = useState('');
  const navigate = useNavigate();
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
      const res = await fetch(`/api/auth/forgotPassword`, 
        {
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(formData),
        }
      );
     
      const data = await res.json();
      if(data.success === false){
        setLoading(false)
        setError(true);
        setMessage(data.message);
        return;
      }
      userId = data;
      setLoading(false)
      navigate('/passwordOTP');
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(true);
    }
  }
  return (
    <section className='max-w-lg mx-auto text-center pt-32'>

    <div className='shadow shadow-red-700 p-4 bg-blue-200'>

      <h1 className='text-center text-2xl font-bold m-6 underline-offset-6 underline underline-offset-8'>Confirm Email</h1>

      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>

        <input type="email" placeholder='ISU Email' className='border p-3 rounded-md border-cyan-950' id='email' onChange={handleChange}/>

        <button disabled={loading} className='border p-3 bg-yellow-500 rounded-md text-2xl text-white hover:text-black cursor-pointer hover:opacity-80
        disabled:opacity-60 w-full'>{loading?'Verifying...' : 'Enter'}</button>
        
      </form>
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
