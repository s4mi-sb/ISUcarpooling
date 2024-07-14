import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Ridecontainer from '../components/Ridecontainer';
import { TbMoodEmpty } from "react-icons/tb";
export default function SearchRides() {
    
    const [searchData,setSearchData] = useState({
        searchValue: '',
        time: 'all',
        luggage: false,
        passengers: '0',
        sort: 'createdAt',
        order: 'desc'
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rides,setRides] = useState([]);
    useEffect(()=>{

        const urlParams = new URLSearchParams(location.search);
        const searchValuefromURL = urlParams.get('searchValue');
        const timefromURL = urlParams.get('time');
        const luggagefromURL = urlParams.get('luggage');
        const passengerfromURL = urlParams.get('passengers');
        const sortfromURL = urlParams.get('sort');
        const orderfromURL = urlParams.get('order');

        if(searchValuefromURL || timefromURL || luggagefromURL ||
            passengerfromURL || sortfromURL || orderfromURL
        ){
            setSearchData({
                searchValue: searchValuefromURL || '',
                time: timefromURL || 'all',
                luggage: (luggagefromURL === 'true') ? true:false,
                passengers: passengerfromURL || '0',
                sort: sortfromURL || 'createdAt',
                order: orderfromURL || 'desc'
            })
        }
        const fetchRides = async ()=>{
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/rideShare/searchRides?${searchQuery}`);
                const data = await res.json();
                if(data.success === false){
                    return;
                }
                setRides(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        fetchRides();

    },[location.search])
    const handleSubmit = (e)=>{
        e.preventDefault();

        const urlParams = new URLSearchParams()
        urlParams.set('searchValue', searchData.searchValue);
        urlParams.set('time', searchData.time);
        urlParams.set('luggage', searchData.luggage);
        urlParams.set('passengers', searchData.passengers);
        urlParams.set('sort', searchData.sort);
        urlParams.set('order', searchData.order);
        const searchQuery = urlParams.toString();
        navigate(`/searchRides?${searchQuery}`);
        }
    const handleChange = (e) =>{
        if(e.target.id === 'all' || e.target.id === 'Morning'
            || e.target.id === 'Afternoon' || e.target.id === 'Noon'){
                setSearchData({...searchData, time: e.target.id})
        }
        if(e.target.id === 'searchValue'){
            setSearchData({...searchData, searchValue:e.target.value});
        }
        if(e.target.id === 'luggage'){
            setSearchData({...searchData,[e.target.id]:e.target.checked
                || e.target.checked === 'true' ? true : false,
            })
        }
        if(e.target.id === 'passengers'){
            setSearchData({...searchData,passengers:e.target.value})
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'createdAt'
            const order = e.target.value.split('_')[1] || 'desc';
            setSearchData({...searchData,sort,order});
        }   

    }
    
  return (
    <div className='pt-20 flex flex-col md:flex-row'>
      <div className='p-7 border-b-4 md:border-r-2 bg-cyan-50 border-r-cyan-800 md:min-h-screen md:fixed'>
        <form onSubmit={handleSubmit}>
            <div className='flex items-center gap-2'>
                <label>Search: </label>
                <input type="text" id='searchValue' onChange={handleChange} value={searchData.searchValue} placeholder='search rides' className='border rounded-md p-3 w-full' />
            </div>

            <h1 className='border-t-4 mt-3 font-extralight'>Narrow down your search</h1>

            <div className='mt-5 gap-y-4 flex flex-col'>

                <label className='text-xl font-semibold'>Time</label>

                <div className='flex-row flex gap-2 flex-wrap'>
                    <input type="checkbox" id='all' onChange={handleChange} checked={searchData.time === 'all'} />
                    <p>Anytime</p>
                    <input type="checkbox" id='Morning' onChange={handleChange} checked={searchData.time === 'Morning'}/>
                    <p>Morning</p>
                    <input type="checkbox" id='Noon' onChange={handleChange} checked={searchData.time === 'Noon'}/>
                    <p>Noon</p>
                    <input type="checkbox" id='Afternoon' onChange={handleChange} checked={searchData.time === 'Afternoon'} />
                    <p>Afternoon</p>
                </div>

                <label className='text-xl font-semibold'>Baggage options</label>
                <div className='flex-row flex gap-2'>
                    <input type="checkbox" id="luggage" onChange={handleChange} checked={searchData.luggage}/>
                    <p>Rides with available luggage space</p>
                </div>

                <div className='flex flex-row gap-3'>
                    <label className='text-xl font-semibold'>Avaliable seats:</label>
                    <select onChange={handleChange}
                    
                    id="passengers" className='border border-slate-600 p-2 rounded-md'>
                        <option value={0}>all options</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <label className='text-xl font-semibold'>Price: </label>
                    <select onChange={handleChange}
                    defaultValue={'createdAt_desc'} 
                    id="sort_order" className='border border-slate-600 p-2 rounded-md'>
                        <option value={'createdAt'}>select</option>
                        <option value={'price_asc'}>lowest to highest</option>
                        <option value={'price_desc'}>highest to lowest</option>
                    </select>
                </div>

            </div>
            <button className='text-center justify-center bg-green-500 w-full p-3 mt-3 rounded-lg text-white hover:text-black
            hover:opacity-80'>Apply filters</button>

        </form>

      </div>

      <div className='md:pl-96 pt-3 flex-1'>
      {loading && <div className='items-center flex flex-col my-10'><ClipLoader color='blue' size={250}/></div>}
      {!loading && rides.length===0 && <div className='flex flex-col items-center'><h1 className='text-xl text-center text-blue-600 hover:underline mb-28'>Unable to find rides!</h1>
        <TbMoodEmpty className='size-60 justify-center'/></div>}
        <div className='max-w-4xl mx-auto flex flex-row justify-center gap-x-24 flex-wrap'>
        {!loading && rides && rides.map((ride)=> <Ridecontainer key={ride._id} ride = {ride}/>) }
        </div>
      </div>
    </div>
  )
}
