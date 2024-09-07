import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    userLoggedin: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SignInStart: (state) =>{
            state.loading = true;
        },
        SignInError: (state, action) =>{
            state.loading = false;
            state.error = action.payload;  
        },
        SignInSuccess: (state, action) =>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
            state.userLoggedin = true;
        }, 
        updateUserStart: (state) =>{
            state.loading = true;
        },
        updateUserSuccess: (state, action) =>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        updateUserError: (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) =>{
            state.loading = true;
        },
        deleteUserSuccess: (state) =>{
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
        deleteUserError: (state) =>{
            state.loading = false;
            state.error = action.payload;
        },
        signOutStart: (state) =>{
            state.loading = true;
        },
        signOutSuccess: (state, action) =>{
            state.loading = false;
            state.currentUser = null;
            state.error = null;
            state.userLoggedin = action.payload.message;
        },
        signOutError: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },

    }
});


export const {SignInError,SignInStart,SignInSuccess, updateUserError, 
    updateUserStart, updateUserSuccess, deleteUserError,
deleteUserStart,deleteUserSuccess, signOutError
, signOutSuccess, signOutStart} = userSlice.actions;

export default userSlice.reducer;