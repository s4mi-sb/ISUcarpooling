import React, { useState } from 'react'

import Mapcontainer from '../components/Mapcontainer'
import {Autocomplete} from '@react-google-maps/api'

import {useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom';
import { signoutUser } from '../components/signoutUser';



export default function RideShare() {

const {currentUser} = useSelector((state) => state.user);


const [time,setTime] = useState('');

const navigate = useNavigate();



const [formData, setFormdata] = useState({
    dropoff: '',
    pickup: '',
    contact: '',
    passengers: 1,
    price: 0,
    luggage: false,
    rules: '',
    departureTime: '',
    alternativeTime: '',
    luggageSpace: 0,
    title: '',
    date: ''

});

const [error,setError] = useState(false);
const [loading, setLoading] = useState(false); 

function setDay(time){
    if(time.includes(':')){
        const [hour] = time.split(":");
        if(parseInt(hour)>12){
            setTime('Afternoon');
        }
        if(parseInt(hour)<12){
            setTime('Morning');
        }
        if(parseInt(hour)===12){
            setTime('Noon');
        }
    }
}
function dateLimit(){
    let month = new Date().getMonth() + 1;
    if(month<10){
        month = '0' + month;
    }
    const year = new Date().getFullYear();
    let day = new Date().getDate();
    if(day<10){
        day = '0' + day;
    }
    return (year + '-' + month + '-' + day);
}

const handleChange = (e) =>{
    
    if(e.target.id === 'luggage'){
        setFormdata({
            ...formData,
            [e.target.id]: e.target.checked,
    })
    }
    if(e.target.type === 'text' || e.target.type === 'number' 
    || e.target.type === 'textarea' || e.target.type === 'time' 
    || e.target.type === 'date'){
        setDay(e.target.value);
        setFormdata({...formData,[e.target.id]: e.target.value});
    }
};
const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/rideShare/rideUpload',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({...formData, userRef: currentUser._id, profile: currentUser.profile, time}),
            
        });
        const data = await res.json();
        setLoading(false);
        if(data.message === "Session expired"){
            signoutUser();
            return;
        }
        if(data.success === false ){
            return setError(data.message);
        }
        navigate(`/rides/${data._id}`);
    } catch (error) {
        setError(error.message);
        setLoading(false);
        
    }
}

return (
    <main className='pt-28'>
      <h1 className='text-4xl text-center my-6 font-semibold underline underline-offset-8'>Share a Ride</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center w-full pb-10'>
        <div className='flex flex-col gap-4 w-full px-6 sm:px-28 lg:px-60'>
            
            <div className='w-full h-auto bg-white'>
                <Mapcontainer/>
            </div>

                <input type="text" placeholder='Title' className='border p-3 rounded-lg w-full' id='title' required onChange={handleChange} value={formData.title}/>
                
                <input type="text" placeholder='PickUp Location' className='border p-3 rounded-lg w-full' id='pickup' required onChange={handleChange} value={formData.pickup}/>
                
                <input type="text" placeholder='DropOff Location' className='border p-3 rounded-lg w-full' id='dropoff' required onChange={handleChange} value={formData.dropoff}/>
            <input type="time" placeholder='Departure Time' className='border p-3 rounded-lg' id='departureTime' required onChange={handleChange} value={formData.departureTime}/>
            <input type="date" placeholder='Date' className='border p-3 rounded-lg' id='date' required onChange={handleChange} value={formData.date} min= {dateLimit()}/>
            <textarea type="text" placeholder='Description (Your rules and preferences)' className='border p-3 rounded-lg resize-none' id='rules'onChange={handleChange} value={formData.rules}/>
            <div className='flex flex-wrap gap-5'>
            
                <br /><label className='font-bold'>Luggage:</label>
                <div className='gap-2 flex'>
                    
                    <input type="checkbox" id='luggage' className='w-5 rounded-full' onChange={handleChange} checked = {formData.luggage}/>
                    <span className='text-sm'>Available space for luggage</span>
                </div>
            </div>
            {formData.luggage?<div className='flex items-center gap-5'>
                    <p className='font-bold'>How many luggages:</p>
                    <input type="number" id='luggageSpace' className='p-3 border border-black rounded-md' min='1' max = '7' onChange={handleChange} value={formData.luggageSpace}/>
            </div>:<div></div>}
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-5'>
                    <p className='font-bold'>Available seats for passengers:</p>
                    <input type="number" id='passengers' className='p-3 border border-black rounded-md' min='1' max = '4' onChange={handleChange} value={formData.passengers}/>
                </div>
                <div className='flex items-center gap-5'>
                    <p className='font-bold'>Price:</p>
                    <input type="number" id='price' className='p-3 border border-black rounded-md' onChange={handleChange} value={formData.price}/>
                </div>
            </div>
            {/* <input type="text" placeholder='Additional Contact info' className='border p-3 rounded-lg' id='contact' onChange={handleChange} value={formData.contact}/> */}
            <button disabled={loading} className='border rounded-md p-3 bg-green-700 text-white hover:opacity-95 disabled:opacity-80'>{loading?'Uploading...':'Create Ride'}</button>
        
            {error && <p className='text-red-700 mt-3 text-center'>{error}</p>}
        </div>
        
      </form>
    </main>
  )
}
