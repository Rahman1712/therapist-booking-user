import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: 'book',
  initialState: { 
    therapist: {} , 
    bookingResult:{} 
},
  reducers: {
    clearBookingData(state){
      state.bookingResult = {};
      state.therapist = {};
    },
    setTherapistData(state, action) {
      state.therapist = action.payload.therapist;
    },
    setBookingResult(state, action) {
      state.therapist = action.payload.therapist;
    },
    
  }
});

export const bookActions = bookSlice.actions;
export default bookSlice;