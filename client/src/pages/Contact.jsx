import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({ride}) {
    
    const [message,setMessage] = useState('');
    const [rider, setRider] = useState([]);
    const [error,setError] = useState(false);

    const handleMessage = (e)=>{
        setMessage(e.target.value);
    }
    useEffect(()=>{
        const fetchRider = async ()=>{
            const userId = ride.userRef;
            try {
                const res = await fetch(`/api/user/${userId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    return;
                }
                setRider(data);
            } catch (error) {
                setError(true);
            }
        }
        fetchRider();
    }, [ride.userRef])
  return (
    <div>
        {error && <Link to = {'/sign-in'}><p className='text-center mt-4 hover:underline'>Something went wrong! Please sign in again.</p></Link>}
        {!error && rider && <textarea value={message} className='w-full p-2 rounded-md mt-5 border border-black bg-slate-200 resize-none' name='message' cols='38' rows='5' id = 'message' 
        placeholder={`Write your message here for ${rider.username} regarding ${ride.title}`} onChange={handleMessage}> 
        </textarea>}
            {!error && <Link to = {`mailto:${rider.email}?subject=Regarding ${ride.title} you posted on ISUcarpool website&body=${message}`}>
            <div className='text-center text-white bg-green-500 max-w-36 rounded-lg hover:opacity-80 hover:text-black mx-auto p-3'>Send Message</div></Link>}
    </div>
  )
}
