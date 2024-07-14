import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar'
import Verify from './pages/Verify'
import Resend from './pages/Resend'
import Privateroute from './components/Privateroute'
import RideShare from './pages/RideShare'
import AvailableRides from './pages/AvailableRides'
import EditRides from './pages/EditRides'
import Rides from './pages/Rides'
import SearchRides from './pages/SearchRides'
import ForgotPassword from './pages/ForgotPassword'
import PasswordOTP from './pages/PasswordOTP'
import NewPassword from './pages/NewPassword'


export default function App() {

  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/about" element = {<About/>}/>
        <Route path = "/sign-in" element = {<SignIn/>}/>
        <Route path = "/sign-up" element = {<SignUp/>}/>
        <Route path = "/verify" element = {<Verify/>}/>
        <Route path = "/searchRides" element = {<SearchRides/>}/>
        <Route path = "/resend" element = {<Resend/>}/>
        <Route path = '/rides/:rideID' element = {<Rides/>}/>
        <Route path='/forgotPassword' element = {<ForgotPassword/>}/>
        <Route path='/passwordOTP' element = {<PasswordOTP/>}/>
        <Route path='/newPassword' element = {<NewPassword/>}/>
        <Route element = {<Privateroute/>}>
          <Route path = "/profile" element = {<Profile/>}/>
          <Route path='/rideShare' element = {<RideShare/>}/>
          <Route path='/editRide/:rideID' element = {<EditRides/>}/>
          <Route path='/availableRides/:userId' element = {<AvailableRides/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
