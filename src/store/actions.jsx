// actions.js
import axios from 'axios';

// Action Types
export const CREATE_SLOT_SUCCESS = 'CREATE_SLOT_SUCCESS';

// Action Creators
export const createSlotSuccess = (slot) => ({
  type: CREATE_SLOT_SUCCESS,
  payload: slot,
});

// Thunk Action Creator
export const createSlot = (therapistId, date, selectedTimes) => (dispatch) => {
  axios
    .post('/api/slots/create', {
      therapistId,
      date,
      selectedTimes,
    })
    .then((response) => {
      const newSlot = response.data;
      dispatch(createSlotSuccess(newSlot));
      // You can also perform other actions after a successful API call
    })
    .catch((error) => {
      // Handle errors or dispatch an error action
    });
};
