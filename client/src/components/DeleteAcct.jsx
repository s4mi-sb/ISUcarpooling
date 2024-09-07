import React from 'react'
import {FaX} from 'react-icons/fa6'
import { useSelector,useDispatch } from 'react-redux'
import { deleteUserError,deleteUserStart,deleteUserSuccess, signOutSuccess} from '../redux/user/userSlice';

export default function DeleteAcct({setDeleteUser}) {

const {currentUser} = useSelector(state => state.user);
const dispatch = useDispatch();

const handleDelete = async () =>{
    try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: "DELETE",
        });
        const data = await res.json();
        console.log(data.message);
        if(data.message === 'Session expired'){
            dispatch(signOutSuccess(data));
            return;
        }
        if(data.success === false){
            dispatch(deleteUserError(data.message));
            return;
        }
        dispatch(deleteUserSuccess(data));
    } catch (error) {
        dispatch(deleteUserError(error.message));
    }
    }

  return (
    <div className={`w-screen h-screen bg-black bg-opacity-90 fixed top-0 right-0 mx-auto items-center flex justify-center`}>
        <div className='border relative rounded-md opacity-100 border-white flex flex-col p-12 bg-white items-center justify-center'>
            <FaX className='absolute cursor-pointer top-2 right-2 size-5' onClick={()=>setDeleteUser(false)}/>
            <p className='font-bold text-xl'>Deleting your account</p>
            <p>Are you sure that you want to delete your account?</p>
            <div className='flex flex-row w-full justify-between py-5'>
                <button className='border w-full p-3 bg-red-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
                disabled:opacity-60 ' onClick={handleDelete}>Yes</button>
                <button className='border w-full p-3 bg-green-500 rounded-md text-xl text-white hover:text-black cursor-pointer hover:opacity-80
                disabled:opacity-60 ' onClick={()=>setDeleteUser(false)}>No</button>
            </div>
            <p>By deleting this account, you will lose the ability to provide rides, communicate with riders, and fully utilize ISUcarpooling.</p>
        </div>
    </div>
  )
}