import { createSlice } from "@reduxjs/toolkit";

const sidebarUserSlice = createSlice({
  name: 'sidebaruser',
  initialState: { userExpanded:true, userActiveLink: "Dashboard" },
  reducers: {
    toggleExpanded(state) {
      state.userExpanded = !state.userExpanded;
    },
    setActiveLink(state, action){
      state.userActiveLink = action.payload.userActiveLink;
    },
    resetValue(state){
      state.userExpanded = true;
      state.userActiveLink = "Dashboard";
    }
  }
});

export const sidebarUserActions = sidebarUserSlice.actions;
export default sidebarUserSlice;