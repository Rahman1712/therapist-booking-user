import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: { expanded:true, activeLink: "Dashboard" },
  reducers: {
    toggleExpanded(state) {
      state.expanded = !state.expanded;
    },
    setActiveLink(state, action){
      state.activeLink = action.payload.activeLink;
    },
    resetValue(state){
      state.expanded = true;
      state.activeLink = "Dashboard";
    }
  }
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice;