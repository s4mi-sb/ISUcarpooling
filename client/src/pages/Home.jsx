import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../../public/bg.png'
import mobilebg from '../../public/carpoolingbg.webp'
import {FaRegHandPointRight, FaArrowUpRightFromSquare} from 'react-icons/fa6'
import './Home.css'

export default function Home() {

  return (
    <section className='Homebg'>
      <div >
      <div className='flex flex-col sm:flex-row lg:bg-slate-300'>
            <div className='flex flex-col flex-wrap px-10 pt-32 gap-10'>
              <h1 className='font-extralight text-center text-white sm:text-black sm:text-start mt-3 text-2xl sm:text-4xl font-mono'>Welcome!</h1>
              <h1 className='font-extralight text-center bg-white rounded-md p-3 sm:text-start text-2xl sm:text-4xl'><span className='text-red-400'>ISUcarpooling</span> is a unique ride sharing solution designed exclusively for Cyclones!</h1>
              <ul className='p-10 flex flex-col lg:text-black text-white justify-center'>
                <li className='cursor-pointer flex-row items-center gap-2 flex mb-10'><FaRegHandPointRight className='text-white sm:text-green-500' size={32}/><p className='text-2xl font-mono'>It's free</p></li>
                <li className='cursor-pointer flex-row items-center gap-2 flex mb-10'><FaRegHandPointRight className='text-white sm:text-green-500' size={32}/><p className='text-2xl font-mono'>Only for ISU students</p></li>
                <li className='cursor-pointer flex-row items-center gap-2 flex mb-10'><FaRegHandPointRight className='text-white sm:text-green-500' size={32}/><p className='text-2xl font-mono'>Save money!</p></li>
                <Link to = {`/profile`}><div className='border max-w-44 text-center mx-auto p-3 bg-green-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
            disabled:opacity-60 '><div className='flex flex-row items-center mx-auto gap-2 justify-center animate-pulse'><p>Get Started</p><FaArrowUpRightFromSquare/></div></div></Link>
                {/* <li>Free to use</li>
                <li>Free to use</li>
                <li>Free to use</li>
                <li>Free to use</li>
                <button>Try it yourself</button> */}
              </ul>
              
            </div>
            <div className='w-full h-screen hidden lg:inline' style={{background : `url(${bg})`, backgroundSize:'cover'}}>
              
            </div>
            
            
      </div>
      </div>
    </section>
  )
}
