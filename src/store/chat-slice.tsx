/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    usersData : [],
    activeUser: null,
    chatItem: null,
    roomId: null,
    therapistsData: [],
    activeTherapist: null,
  },
  reducers: {
    setUsersData : (state, action: PayloadAction<any>) => {
      state.usersData = action.payload.usersData;
    },
    setActiveUser: (state, action: PayloadAction<any>) => {
      state.activeUser = action.payload.activeUser;
    },
    setChatItem: (state, action: PayloadAction<any>) => {
      state.chatItem = action.payload.chatItem;
    },
    setRoomId: (state, action: PayloadAction<any>) => {
      state.roomId = action.payload.roomId;
    },
    setTherapistsData : (state, action: PayloadAction<any>) => {
      state.therapistsData = action.payload.therapistsData;
    },
    setActiveTherapist: (state, action: PayloadAction<any>) => {
      state.activeTherapist = action.payload.activeTherapist;
    },

    resetAll: (state) => {
      state.usersData = [];
      state.activeUser = null;
      state.chatItem = null;
      state.roomId = null;
      state.therapistsData = [];
      state.activeTherapist = null;
    },
  }
});

export const chatActions = chatSlice.actions;
export default chatSlice;

