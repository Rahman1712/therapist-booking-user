/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    isLoggedIn:false, 
    access_token:null, 
    id: null, 
    username: null, 
    email: null, 
    fullname: null,
    role: null, 
    activated: null, 
    submited: null,
    mobile: null,
    imageUrl: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.access_token = action.payload.access_token;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.activated = action.payload.activated;
      state.submited = action.payload.submited;
      state.mobile = action.payload.mobile;
      state.fullname = action.payload.fullname;
      state.imageUrl = action.payload.imageUrl;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.access_token = null;
      state.id = null;
      state.username = null;
      state.email = null;
      state.role = null;
      state.activated = null;
      state.submited = null;
      state.mobile = null;
      state.fullname = null;
      state.imageUrl = null;
    },
    setEmail(state, action){
      state.email = action.payload.email;
    },
    setMobile(state, action){
      state.mobile = action.payload.mobile;
    },
    setFullname(state, action){
      state.fullname = action.payload.fullname;
    },
    setUsername(state, action){
      state.username = action.payload.username;
    },
    setAccessToken(state, action){
      state.access_token = action.payload.access_token;
    },
    setisLoggedIn(state, action){
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setRole(state, action){
      state.role = action.payload.role;
    },
    setSubmited(state, action){
      state.submited = action.payload.submited;
    },
    setImageUrl(state, action){
      state.imageUrl = action.payload.imageUrl;
    }
   
  }
});

export const authActions = authSlice.actions;
export default authSlice;