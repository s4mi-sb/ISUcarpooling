import React, { useEffect } from 'react'
import { FaX} from 'react-icons/fa6';
import {FaSearch, FaCar, FaBars} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './NavBar.css'
import logo from '../../public/logo.jpg'

export default function NavBar() {

const {currentUser} = useSelector((state) => state.user);

const [open,setOpen] = useState(false);

const [searchValue,setSearch] = useState('');

const menuRef = useRef(null);
const navigate = useNavigate();

const openMenu = () =>{
  setOpen(true);
}
const closeMenu = ()=>{
  setOpen(false);
}
useEffect(()=>{
  const urlData = new URLSearchParams(location.search);
  const searchValfromURL = urlData.get('searchValue');
  if(searchValfromURL){
    setSearch(searchValfromURL);
  }
  const handleSize = ()=>{
    if (window.innerWidth > 768) {
        setOpen(false);
    }
  }
  handleSize();


  window.addEventListener('resize', handleSize);

  return () => window.removeEventListener('resize', handleSize);
},[location.search])

const handleSubmit = (e)=>{
  e.preventDefault();
  const urlData = new URLSearchParams(window.location.search);
  urlData.set('searchValue',searchValue);
  const searchQuery = urlData.toString();
  navigate(`/searchRides?${searchQuery}`);

}
  return (
    <header className='fixed z-10 w-full bg-cyan-700'>
    <div className='flex flex-row justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/'>
            <div className='cursor-pointer '>
                <img src={logo}  className='sm:w-40 w-24'/>
            </div>
        </Link>

            <ul className='hidden gap-10 items-center lg:flex'>

              <Link to = '/'><li className=' cursor-pointer hidden lg:inline bg-gray-300 p-2 rounded-md hover:bg-blue-500'>Home</li></Link>
              <Link to = '/about'><li className='cursor-pointer hidden lg:inline bg-gray-300 p-2 rounded-md hover:bg-blue-500'>About</li></Link>
              <Link to = '/profile'>
              {currentUser ? 
                (<img src={currentUser.profile}alt="profile" className='hidden size-9 lg:inline rounded-full'/>) :  
                (<li className='cursor-pointer hidden lg:inline bg-gray-300 p-2 rounded-md hover:bg-blue-500'>Sign in</li>)          
              }
                </Link>  
              
              
            </ul>
            <form onSubmit={handleSubmit} className='bg-white p-2 md:p-3 rounded-lg flex items-center'>
                <input type="text" placeholder='Search Rides' value={searchValue} onChange={(e)=>setSearch(e.target.value)} className='focus:outline-none w-36 sm:w-64'/>
                <button><FaSearch className='text-red-500'/></button>
            </form>
            
            
             <FaBars className='lg:hidden size-6' onClick={openMenu}/>
      </div>
      {/* mobile */}
      
      <div className={`${open?'show':'hide'} w-full bg-blue-500`} id='menu' ref={menuRef}>
      <ul className='flex items-center justify-center gap-10 transition'>
      <Link to = '/'><li className='rounded-md bg-slate-300 p-2' onClick={closeMenu}>Home</li></Link>
        <Link to = '/about'><li className='rounded-md bg-slate-300 p-2' onClick={closeMenu} >About</li></Link>
        <Link to = '/profile'>
              {currentUser ? 
                (<div><img data-popover-target="popover-user-profile" src={currentUser.profile} alt="profile" className='size-9  rounded-full hover:bg-blue-500' onClick={closeMenu} /></div>
              ) :  
                (<li className='cursor-pointer bg-gray-300 p-2 rounded-md ' onClick={closeMenu} >Sign in</li>)          
              }
                </Link>    
        <li><FaX onClick={closeMenu} className = 'size-5'/></li>
      </ul>
    </div>
    
    </header>
  )
}
