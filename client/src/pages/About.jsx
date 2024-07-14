import React, { useState } from 'react'
import {FaCar, FaCarSide} from 'react-icons/fa6'
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';


export default function About() {
  

  return (
    <section className='max-w-6xl mx-auto mb-7 pt-32'>
      <div className='justify-center flex flex-col text-center'>
      <h1 className='font-bold text-xl flex flex-col flex-wrap items-center mx-10 sm:mx-28'>
       <div className='flex flex-row items-center'>
          <span className='text-red-500 text-2xl'>ISU</span>

          <FaCar className='items-center'/>

          <span className='text-yellow-500 text-2xl'>pooling _ _ _ _ _ _</span>

          <FaCarSide className='items-center'/>
       </div>
       <p className='text-sm mt-3'>"Connecting students, saving miles, sharing smiles."</p>
      </h1>
        <p className='text-3xl mt-5 font-extrabold underline-offset-8 underline'>About ISUcarpooling</p>
      </div>
      <div className='justify-center mx-10'>
      <p className='mt-5 leading-9'>Welcome to <span className='text-red-600'>ISUcarpooling</span>, the premier platform for Iowa State University 
      students looking to connect for hassle-free travel home during holidays and breaks. Whether you're journeying 
      to Des Moines, Cedar Rapids, or anywhere else, we're dedicated to making your trip convenient, affordable, and 
      eco-friendly. By carpooling with fellow Cyclones, you not only save on travel costs but also contribute to reducing 
      traffic congestion and carbon emissions.

      </p>
      <p className='mt-5 leading-9'>Our user-friendly platform allows you to find and coordinate rides with ease, ensuring that you can focus on what matters 
      most—your studies and time with family and friends. Join our vibrant community of students who are embracing sustainable 
      travel choices while building lasting connections. Whether it's for Thanksgiving, spring break, or summer vacation, let 
      ISUcarpooling help you make the most of your time at Iowa State University by simplifying your travel plans. 
      Together, let's make every journey home a seamless and memorable experience. Start carpooling today and discover the benefits 
      of shared travel with your fellow Cyclones!</p>

      <h1 className='my-5 text-4xl underline underline-offset-8'>Questions you may ask</h1>

      <Collapsible trigger= 
          {<div className='md:text-xl items-center rounded-lg justify-between border py-3  flex-row flex my-3'>
            <p className='font-bold'>How does the carpooling service work?</p><p>+</p>
          </div>} transitionTime={200}>
            <p>ISUcarpooling connects drivers with available seats to passengers heading in the same direction. 
              Let's say you would like to head to Cedar Rapids during the weekends, by simply signing up with your ISU 
              email you can enter your travel details, and browse from the available rides. 
              Once you find your match, you can contact the driver and enjoy the ride!</p>
      </Collapsible>

      <Collapsible trigger= 
          {<div className='md:text-xl items-center rounded-lg justify-between border py-3  flex-row flex my-3'>
            <p className='font-bold'>How do I sign up and create an account?</p><p>+</p>
          </div>} transitionTime={200}>
            <p>To ensure the safety of all users, you may only <Link to = '/profile'> <span className='text-blue-500 hover:underline'>sign-up </span></Link> 
             using an ISU email address. This is because we want to restrict access to only ISU students for safety and security reasons.
            </p>
      </Collapsible>

      <Collapsible trigger= 
          {<div className='md:text-xl items-center rounded-lg justify-between border py-3  flex-row flex my-3'>
            <p className='font-bold'>How can I offer a ride?</p><p>+</p>
          </div>} transitionTime={200}>
            <p>After signing up, you can easily <Link to = '/rideShare'> <span className='text-blue-500 hover:underline'>offer </span></Link> a ride by clicking the 'Offer a Ride' button on the profile page.</p>
      </Collapsible>

      <Collapsible trigger= 
          {<div className='md:text-xl items-center rounded-lg justify-between border py-3  flex-row flex my-3'>
            <p className='font-bold'>What if I need to cancel a ride?</p><p>+</p>
          </div>} transitionTime={200}>
            <p>If you want to cancel a ride for unexpected reasons, don't worry, simply go to you profile tab and click on the 'View my uploads' button 
              and delete the ride you would like to cancel.
            </p>
      </Collapsible>

      <Collapsible trigger= 
          {<div className='md:text-xl items-center rounded-lg justify-between border py-3  flex-row flex my-3'>
            <p className='font-bold'>Can I make restrictions on luggage or number of passengers?</p><p>+</p>
          </div>} transitionTime={200}>
            <p>Absolutely, you have the power to decide how many passengers and luggages you want to accomodate in your ride. If you wish to add more 
              restrictions, you may add them in your description. </p>
      </Collapsible>
      <Collapsible trigger= 
          {<div className='md:text-xl items-center rounded-lg justify-between border py-3  flex-row flex my-3'>
            <p className='font-bold'>I found an issue on the website? Who do I contact?</p><p>+</p>
          </div>} transitionTime={200}>
            <p>If you find a bug in this website, you may contact me through this <Link to = {`mailto:sambar@iastate.edu`}> <span className='text-blue-500 hover:underline'>email</span></Link></p>
      </Collapsible>

      

    
      
      </div>
      
    </section>
  )
}
