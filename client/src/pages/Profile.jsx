import React, { useState, useRef, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { updateUserError,updateUserStart, updateUserSuccess, 
  deleteUserError,deleteUserStart,deleteUserSuccess,
signOutError, signOutSuccess, signOutStart } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { getSignedURL } from '../actions.js';
import DeleteAcct from '../components/DeleteAcct.jsx';



export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser, error, loading} = useSelector(state => state.user);
  const user = currentUser.username;
  const dispatch = useDispatch();
  const [form, setForm] = useState([]);
  const [imageSuccess,setImageSuccess] = useState(false);
  const navigate = useNavigate();
  const [update, setupdate] = useState(false);
  const [showImageError, setImageError] = useState(false);
  const [file,setFile] = useState(undefined);
  const [deleteUser,setDeleteUser] = useState(false);
 


  const validImages = ['image/jpg', 'image/jpeg', 'image/png'];

  const handleChange = (e) =>{
    setForm({...form, [e.target.id]: e.target.value});
  };

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = async (file) =>{

    try {
      
        if(!validImages.find(type => type === file.type)){
          setImageError(true);
          return;
        }
        const signedURL = await getSignedURL(file.name, file.size, file.type);
    
        if(signedURL.failure !== undefined){
          throw new Error(signedURL.failure);
       
        }
        const url = signedURL.success.url
        await fetch(url, {
          method: 'PUT',
          body: file,
          headers:{
            "Content-Type" : file.type
          },
        });
        const downloadURL = await signedURL.download.url.split('?')[0];
        setForm({...form, profile: downloadURL});
        setImageSuccess(true);
        
       
    } catch (error) {
      console.log(error.message);
      setImageError(true);
      return;
    }
  }
  const handleSubmit = async (e) =>{
    
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method : "POST",
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if(data.message === 'Session expired'){
        dispatch(signOutSuccess(data));
        return;
      }
      if(data.success === false){
        dispatch(updateUserError(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setupdate(true);
    } catch (error) {
      dispatch(updateUserError(error.message));
    }
  }
  const handleDelete = async () =>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: "DELETE",
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserError(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserError(error.message));
    }
  }

  const handleSignout = async () =>{
    try {
      dispatch(signOutStart());
  
      const res = await fetch('api/auth/signout');
      const data = await res.json();
     
      if(data.success === false){
        dispatch(signOutError(data.message));
    
      }
      dispatch(signOutSuccess(data));
 
    } catch (error) {
      dispatch(signOutError(error.message));
  
    }
  }
  const handleUser = async ()=>{
    try {
      const res = await fetch(`/api/user/${currentUser._id}`);
      const data = await res.json();
      if(data.message === 'Session expired'){
        dispatch(signOutSuccess(data));
        return;
      }
      if(data.success === false){
          console.log(data.message);
          return;
      }
      navigate('/rideShare')
  } catch (error) {
      setError(true);
  }
  }

  

  return (
    <section className='max-w-lg pt-32 mx-auto text-center'>

    <div className='shadow shadow-red-700 p-4 bg-blue-200 rounded-lg'>

    <h1 className='text-center text-3xl text-black my-5 uppercase'>{user}</h1>

      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>

      <input onChange={(e)=>setFile(e.target.files[0])}
       type="file" ref={fileRef} className='hidden' accept='image/*'/>

      <img onClick={()=>fileRef.current.click()} src={form.profile || currentUser.profile} alt="" className='rounded-full self-center h-24 w-24 object-cover cursor-pointer'/>

      {imageSuccess && <p className='text-green-700 mt-5'>Image uploaded successfully!</p>}

        <input type="text" placeholder='username' className='border p-3 rounded-md border-cyan-950' id='username' defaultValue={currentUser.username} onChange={handleChange}/>

        <input type="email" placeholder='email' className='border p-3 rounded-md border-cyan-950' id='email' defaultValue={currentUser.email} onChange={handleChange}/>

        <input type="password" placeholder='password' className='border p-3 rounded-md border-cyan-950' id='password'  onChange={handleChange}/>

        <button disabled={loading}
        className='border p-3 bg-yellow-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
        disabled:opacity-60 w-full'>{loading?'Updating...':'Update Profile'}</button>

        {error && <p className='text-red-700 mt-5'>{error}</p>}

        

        {showImageError && <p className='text-red-700 mt-5'>Error uploading image</p>}

        {update ? <p className='mt-5 text-green-700'>Profile updated</p>: ""}

        {error ? <div className='border p-3 bg-green-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
        disabled:opacity-60 w-full'>View my uploads</div> :
        <Link  to = {`/availableRides/${currentUser._id}`} className='border p-3 bg-green-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
        disabled:opacity-60 w-full'>{loading?'Getting data...':'View my uploads'}</Link>
        }

        <Link className='border p-3 bg-slate-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
        disabled:opacity-60 w-full' onClick={handleUser}>Offer a Ride</Link>

        
        
      </form>

      <div className='flex gap-2 mt-5 justify-between items-center'>

      <p className='flex items-center text-red-600 cursor-pointer hover:underline' onClick={handleSignout}>Sign out</p>

      
      {/* onClick={handleDelete} */}
      <p className='flex items-center text-red-600 cursor-pointer hover:underline' onClick={()=>setDeleteUser(!deleteUser)}>Delete My Account</p>
      {deleteUser && <DeleteAcct setDeleteUser = {setDeleteUser}/>}
      

      

      </div>
      
      </div>
      
    
      </section>
  )
}

//onClick={handleDelete}