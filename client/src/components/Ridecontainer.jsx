import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import { CiClock2 } from "react-icons/ci";
import { FaPersonWalkingLuggage, FaPeopleGroup  } from "react-icons/fa6";
import { MdNoLuggage, MdCalendarMonth} from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";

export default function Ridecontainer({ride}) {
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
    <div className='w-fit py-10'>
      <Link to = {`/rides/${ride._id}`}>
      <Box className='rounded-lg bg-cyan-50 shadow-md' height={650}
        width={385}
        my={4}
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}>
            <Link to = {`/rides/${ride._id}`} className='font-extrabold text-xl hover:underline cursor-pointer text-blue-700'><h1 className='text-center mb-4'>{ride.title}</h1></Link>
            <div className='justify-center flex mb-6'><img src={ride.profile} alt="riderProfile" className='size-20 rounded-full object-cover' /></div>
            <div className='flex flex-col'>
                <b className='mb-2'>Pickup:</b>
                <input disabled type="text" defaultValue={ride.pickup} className='border border-black p-2 rounded-lg bg-slate-200 mb-2'/>
            </div>
            <div className='flex flex-col'>
                <b className='mb-2'>Dropoff:</b>
                <input disabled type="text" defaultValue={ride.dropoff} className='border border-black p-2 rounded-lg bg-slate-200 mb-2'/>
            </div>
            <div className='flex mb-5 flex-col justify-start'><b className='mb-2'>Description by rider: </b><textarea disabled type="text" defaultValue={ride.rules} className='border border-black p-2 rounded-lg bg-slate-200 resize-none'/></div>
            
            <div className='flex flex-row gap-2'>
                <CiClock2 className='size-7 '/>
                <input type="text" disabled  defaultValue={setTimeto12Format(ride.departureTime)}  className='bg-slate-200 border-black p-1 rounded-lg mb-3'/>
            </div>
            <div className='flex flex-row gap-2'>
                <MdCalendarMonth className='size-7 '/>
                <input type="text" disabled  defaultValue={ride.date}  className='bg-slate-200 border-black p-1 rounded-lg mb-3'/>
            </div>
            <div className='flex flex-row justify-between mb-5'>
                {ride.luggage?<div><FaPersonWalkingLuggage className='size-7'/>{ride.luggageSpace}{ride.luggageSpace > 1?' luggages':' luggage'}</div>:<div><MdNoLuggage className='size-7'/>No luggage</div>}
                
                <div className=''><FaPeopleGroup className='size-7 mr-3'/>{ride.passengers}{ride.passengers > 1?' passengers':' passenger'}</div>
               
            </div>
            <div className='flex flex-row gap-2'>
            <FaDollarSign color='green' className='size-7'/>
            <input type="text" disabled  defaultValue={ride.price}  className='bg-slate-200 border-black p-1 rounded-lg mb-3'/>
            </div>
        </Box>
      </Link>
    </div>
  )
}
