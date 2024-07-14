import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { CiClock2 } from "react-icons/ci";
import { FaPersonWalkingLuggage, FaPeopleGroup  } from "react-icons/fa6";
import { MdNoLuggage, MdError  } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { TbMoodEmpty } from "react-icons/tb";
import {FaX} from 'react-icons/fa6'


export default function AvailableRides() {
    const param = useParams();
    const [userRides, setUserRides] = useState([]);
    const [error, setError] = useState(false);
    const [deleteRide,setDeleteRide] = useState(false);
    

    useEffect(()=>{
        const fetchRides = async()=>{
            const userId = param.userId;
            try {
                const res = await fetch(`/api/user/availableRides/${userId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                }
                setUserRides(data);
            } catch (error) {
                setError(true);
            }
        }
        fetchRides();
        
    }, []);

    const handleRideDelete = async (rideId) =>{
        try {
           const res = await fetch(`/api/rideShare/deleteRide/${rideId}`,{
                method: 'DELETE'
           });
           const data = await res.json();
           if(data.success === false){
                setError(true);
                return;
           }
           setUserRides((prev)=> prev.filter((userRides) => userRides._id !== rideId));
        } catch (error) {
            setError(true);
        }
    }
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
    <section className='pt-32'>
        <h1 className='text-center text-4xl font-bold underline-offset-8 underline p-2'>Your Uploads</h1>
        <div className='flex flex-col p-2 gap-8 max-w-6xl mx-auto'>
            <div className='flex flex-wrap gap-8 justify-center'>
      {userRides && userRides.length > 0 && 
        userRides.map((ride) => <div key={ride._id} className=''>
            <Box height={600}
        width={300}
        my={4}
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}>
            <Link to = {`/rides/${ride._id}`} className='font-bold text-3xl hover:underline cursor-pointer text-blue-700'><h1 className='text-center mb-4'>{ride.title}</h1></Link>
            <div className='flex flex-col justify-start'><b className='mb-2'>Pickup:</b><input disabled type="text" defaultValue={ride.pickup} className='border border-black p-2 rounded-lg bg-slate-200 mb-2'/></div>
            <div className='flex flex-col justify-start'><b className='mb-2'>Dropoff:</b><input disabled type="text" defaultValue={ride.dropoff} className='border border-black rounded-lg p-2 bg-slate-200 mb-2'/></div>
            <div className='flex flex-col justify-start'><b className='mb-2'>Description: </b><textarea disabled type="text" defaultValue={ride.rules} className='border border-black p-2 rounded-lg bg-slate-200 resize-none'/></div>
            <br />
                <div className='flex flex-row gap-2'>
                <CiClock2 className='size-7 '/>
                <input type="text" disabled  defaultValue={setTimeto12Format(ride.departureTime)}  className='bg-slate-200 border-black p-1 rounded-lg mb-3'/>
                </div>
            <div className='flex flex-row justify-between mb-5'>
                {ride.luggage?<div><FaPersonWalkingLuggage className='size-7'/>{ride.luggageSpace}{ride.luggageSpace > 1?' luggages':' luggage'}</div>:<div><MdNoLuggage className='size-7'/>No luggage</div>}
                
                <div className=''><FaPeopleGroup className='size-7 mr-3'/>{ride.passengers}{ride.passengers > 1?' passengers':' passenger'}</div>
               
            </div>
            <div className='flex flex-row gap-2'>
            <FaDollarSign className='size-7'/>
            <input type="text" disabled  defaultValue={ride.price}  className='bg-slate-200 border-black p-1 rounded-lg mb-3'/>
            </div>
            <div className='flex flex-row justify-between'>
            <Link className='w-full' to = {`/editRide/${ride._id}`}><button disabled={error} className='border w-full p-3 bg-green-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
            disabled:opacity-60 '> Edit</button></Link>
            <button disabled={error} className='border w-full p-3 bg-red-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
            disabled:opacity-60 ' onClick={()=>setDeleteRide(!deleteRide)}>Delete</button>
            </div>
            </Box>

            {deleteRide && <div className={`w-screen h-screen bg-black bg-opacity-70 fixed top-0 right-0 mx-auto items-center flex justify-center`}>
            <div className='border relative rounded-md opacity-100 border-white flex flex-col p-12 bg-white items-center justify-center'>
                <FaX className='absolute cursor-pointer top-2 right-2 size-5' onClick={()=>setDeleteRide(false)}/>
                <p className='font-bold text-xl'>Deleting Ride</p>
                <p>Are you sure that you want to delete this ride?</p>
                <div className='flex flex-row w-full justify-between py-5'>
                    <button className='border w-full p-3 bg-red-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
                    disabled:opacity-60 ' onClick={() =>handleRideDelete(ride._id)}>Yes</button>
                    <button className='border w-full p-3 bg-green-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
                    disabled:opacity-60 ' onClick={()=>setDeleteRide(false)}>No</button>
                </div>
                <p>Deleting this ride will prevent users from contacting you regarding it.</p>
                </div>
            </div>}

        </div>) 
      }
       
      
      </div>
        </div>
        {error && 
        <Link to ='/profile'>
            <div className='flex flex-col items-center'> 
                <h1 className='text-xl text-center text-blue-600 hover:underline mb-28'>Your session has timed out. Please sign in again.</h1>
                <MdError className='size-60 justify-center text-red-700'/>
            </div>
        </Link>}
        {userRides.length === 0 && 
        <Link to ='/rideShare'>
            <div className='flex flex-col items-center'> 
                <h1 className='text-xl text-center text-blue-600 hover:underline mb-28'>You have not uploaded yet. Click here to create your own rides.</h1>
                <TbMoodEmpty className='size-60 justify-center'/>
            </div>
        </Link>}
</section>
  )
}
