import { createSlice } from "@reduxjs/toolkit";

const slotSlice = createSlice({
  name: 'slot',
  initialState: { slots:[]},
  reducers: {
    setSlotsData(state, action) {
      state.slots = action.payload.slots;
    }
  }
});

export const slotActions = slotSlice.actions;
export default slotSlice;