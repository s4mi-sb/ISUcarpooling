import { signOutError, signOutStart, signOutSuccess } from '../redux/user/userSlice';
import {store} from '../redux/app/store.js'

export async function signoutUser() {
    const dispatch = store.dispatch;
    
    dispatch(signOutStart());

    try {
        const res = await fetch('/api/auth/signout');
        const data = await res.json();
        
        if (data.success === false) {
            dispatch(signOutError(data.message));
        } else {
            dispatch(signOutSuccess(data));
        }
    } catch (error) {
        dispatch(signOutError(error.message));
    }
}
