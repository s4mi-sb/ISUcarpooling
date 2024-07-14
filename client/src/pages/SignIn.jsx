import React, { useState } from 'react'
import {FaCar, FaCarSide} from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { SignInError, SignInStart, SignInSuccess } from '../redux/user/userSlice.js';
import logo from '../../public/logo.jpg'

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {currentUser, loading, error} = useSelector(state => state.user);
  const dispatch = useDispatch();
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
      
      dispatch(SignInStart());
      const res = await fetch('/api/auth/signin', 
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
        
        dispatch(SignInError(data.message));
        return;
      }
      
      dispatch(SignInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(SignInError(error.message));
    }
 
    // console.log(data);
  }
  // console.log(formData);

  return (
    <section className='max-w-lg mx-auto text-center pt-32'>

    <div className='shadow shadow-red-700 p-4 bg-blue-200'>

      <h1 className='text-center text-2xl font-bold m-6 underline-offset-6 underline underline-offset-8'>Sign In</h1>

      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>

        <input type="email" placeholder='email' className='border p-3 rounded-md border-cyan-950' id='email' onChange={handleChange}/>

        <input type="password" placeholder='password' className='border p-3 rounded-md border-cyan-950' id='password' onChange={handleChange}/>

        <button disabled={loading} className='border p-3 bg-yellow-500 rounded-md text-2xl text-white hover:text-black cursor-pointer hover:opacity-80
        disabled:opacity-60 w-full'>{loading?'Verifying...' : 'Sign In'}</button>
        
      </form>

      <div className='flex gap-2 mt-5'>

      <p className='flex items-center'>Create an account? </p>

      <Link to="/sign-up"><span className='text-red-500 cursor-pointer hover:underline'>Sign Up</span></Link>
      
      </div>

      <Link to="/forgotPassword"><p className='text-red-500 cursor-pointer text-start hover:underline'>Forgot Password?</p></Link>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
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
