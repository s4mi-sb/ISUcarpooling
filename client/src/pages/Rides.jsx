import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { MdError, MdNoLuggage  } from "react-icons/md";
import { FaLocationDot, FaPeopleGroup, FaCarSide, FaPersonWalkingLuggage } from "react-icons/fa6";

import { useSelector } from 'react-redux'

import rideBG from '../../public/bg.png'
import Contact from './Contact';



export default function Rides() {

  const {currentUser} = useSelector(state => state.user);
    const param = useParams();
    const [ride, setRide] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [contact, setContact] = useState(false);

    useEffect(()=>{
        const fetchuserRide = async ()=>{ 
            const rideId = param.rideID;
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                const res = await fetch(`/api/rideShare/getRide/${rideId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true)
                    setLoading(false)
                    console.log(data.message);
                    return;
                }
                setLoading(false)
                setRide(data);
            } catch (error) {
                setLoading(false)
                setError(true)
                console.log(error.message);
            }
        }
        fetchuserRide();
    }, [param.rideID]);
    function setTimeto12Format(time){
      const [hours, minutes] = time.split(':');
          let period = 'AM';
          let hour = parseInt(hours);
  
          if (hour >= 12) {
              period = 'PM';
              if (hour > 12) {
                  hour -= 12;
              }
          }
      return `${hour}:${minutes} ${period}`
  }


  return (
    <main className='pt-32' >
      {loading && <div className='items-center flex flex-col my-10'><ClipLoader size={250}/></div>}
      {error && <div className='items-center flex flex-col my-10'>
      <h1 className='text-xl text-center text-red-600 mb-28'>Something went wrong!</h1>
        <MdError className='size-60 justify-center text-red-700'/></div>}
      {!loading && ride && <div className='py-10 border border-black max-w-4xl mx-auto mt-10 m-24 rounded-md shadow-xl sm:bg-center'> 
      <h1 className='text-center text-3xl text-black font-extralight underline underline-offset-4'>{ride.title}</h1>
      
      <div className='flex flex-row items-center gap-10 md:gap-32 m-10 flex-wrap justify-center'>
        <img className='size-32 object-cover border rounded-full border-slate-400 border-solid' src={ride.profile} />
        <div className='flex flex-col justify-center gap-3 p-2 border border-black rounded-md bg-white'>
          <h2 className='text-xl font-extrabold text-black'>Heading to {ride.dropoff}!</h2>
          <h2>Leaving at <span className='text-green-700 font-extrabold'>{setTimeto12Format(ride.departureTime)}</span></h2>
          <div className='flex flex-row gap-4 items-center'> 
              <p className='text-black font-extrabold'>I will take</p>
              <div className=''><FaPeopleGroup className='size-7 mr-3'/>{ride.passengers}{ride.passengers > 1?' passengers':' passenger'}</div>
              {ride.luggage?<div><FaPersonWalkingLuggage className='size-7'/>{ride.luggageSpace}{ride.luggageSpace > 1?' luggages':' luggage'}</div>:<div><MdNoLuggage className='size-7'/>No luggage</div>}
          </div>
          <div className='text-center'>
            <p className='text-xl text-green-700'>${ride.price}</p>
          </div>
        </div>
      </div>
      <div className='bg-orange-50 rounded-lg text-black pt-1 shadow-sm shadow-black pb-10'>
      <div className='flex flex-row items-center mt-10 justify-between rounded-sm px-4'>
        <div><FaLocationDot color='black' className=' size-8'/>
        <p className='text-xs' >pickup<br /><span className='font-extrabold'>{ride.pickup}</span></p></div>
        <div className='items-center flex flex-row'>___<p className='font-extrabold'>{ride.date}</p>___<FaCarSide className=' size-10'/>___</div>
        <div><FaLocationDot color='green' className='size-8'/>
        <p className='text-xs'>dropoff<br /><span className='font-extrabold bg-white'>{ride.dropoff}</span></p></div>
      </div>
      <br /><label className='italic mx-3'>Description</label>
      <p className='border border-black p-4 rounded-md mx-3'>{ride.rules}</p>
      </div>
      {currentUser === null && <Link to = '/sign-in'><p className='mt-3 text-xl text-center text-blue-500 hover:underline'>Please sign in to contact rider!</p></Link>}
      {currentUser && currentUser._id !== ride.userRef && !contact &&
          <div className='text-center'>
          <button className='border mt-3 max-w-xl p-3 bg-red-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
                disabled:opacity-60 self-center' onClick={()=>setContact(true)}>Contact Rider</button>
          </div>
      }
      {contact && <Contact ride ={ride}/>}
      </div>}
        
    </main>
  )
}
