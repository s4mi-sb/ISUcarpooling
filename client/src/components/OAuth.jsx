import React from 'react'
import {OAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';

export default function OAuth() {

const handleClick = async () => {
    try {
        const provider = new OAuthProvider('microsoft.com');
        const auth = getAuth(app);

        const result = await signInWithPopup(auth,provider).then((result) => {
            // User is signed in.
            // IdP data available in result.additionalUserInfo.profile.
        
            // Get the OAuth access token and ID Token
            const credential = OAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            const idToken = credential.idToken;
          })

        console.log(result);
        
    } catch (error) {
        console.log("Couldn't sign in with Outlook", error);
    }
}


  return (
    <div onClick={handleClick}
    type='button' className='bg-blue-500 p-4 rounded-md hover:opacity-80 text-white hover:text-black'>
      Sign in with ISU account
    </div>
  )
}
