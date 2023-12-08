import { therapistsAxiosApi } from "../config/axiosConfig";
import { THERAPIST_PUBLIC_API } from "../constants";


// Redux Thunk action for creating a therapist availability slot
export const createTherapistAvailabilitySlot = (therapistId, date, selectedTimes) => {
  return async (dispatch) => {
    try {
      // Make an Axios POST request to create a therapist availability slot
      const response = await therapistsAxiosApi.post('/api/slots/create', {
        therapistId,
        date,
        selectedTimes,
      });

      if (response.status === 200) {
        // Dispatch an action for success (e.g., slot creation successful)
        dispatch(slotCreationSuccess(response.data));
      } else {
        // Dispatch an action for failure (e.g., slot creation failed)
        dispatch(slotCreationFailure('Failed to create slot'));
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Dispatch an action for failure in case of an exception
      dispatch(slotCreationFailure('An error occurred while creating the slot'));
    }
  };
};

// Redux Thunk action for adding times to an existing slot
export const addTimesToSlot = (id, additionalTimes) => {
  return async (dispatch) => {
    try {
      // Make an Axios PUT request to add times to an existing slot
      const response = await therapistsAxiosApi.put(`/api/slots/${id}/add-times`, {
        additionalTimes,
      });

      if (response.status === 200) {
        // Dispatch an action for success (e.g., times added successfully)
        dispatch(addTimesSuccess(response.data));
      } else {
        // Dispatch an action for failure (e.g., times addition failed)
        dispatch(addTimesFailure('Failed to add times to the slot'));
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Dispatch an action for failure in case of an exception
      dispatch(addTimesFailure('An error occurred while adding times to the slot'));
    }
  };
};


export const deleteTherapistAvailabilitySlot = (id) => {
  return async (dispatch) => {
    try {
      // Make an Axios DELETE request to delete a therapist availability slot
      await therapistsAxiosApi.delete(`/api/slots/${id}/delete`);
      // Dispatch an action for success (e.g., slot deletion successful)
      dispatch(slotDeletionSuccess());
    } catch (error) {
      console.error('An error occurred:', error);
      // Dispatch an action for failure (e.g., slot deletion failed)
      dispatch(slotDeletionFailure('Failed to delete the slot'));
    }
  };
};


export const removeTimesFromSlot = (id, timesToRemove) => {
  return async (dispatch) => {
    try {
      // Make an Axios PUT request to remove times from a slot
      await therapistsAxiosApi.put(`/api/slots/${id}/remove-times`, timesToRemove);
      // Dispatch an action for success (e.g., times removed successfully)
      dispatch(timesRemovalSuccess());
    } catch (error) {
      console.error('An error occurred:', error);
      // Dispatch an action for failure (e.g., times removal failed)
      dispatch(timesRemovalFailure('Failed to remove times from the slot'));
    }
  };
};

export const getUpcomingSlotsByTherapist = (therapistId) => {
  return async (dispatch) => {
    try {
      // Make an Axios GET request to get upcoming slots by therapist
      const response = await therapistsAxiosApi.get(`/api/slots/get-upcoming-by-therapist/${therapistId}`);
      // Dispatch an action for success (e.g., upcoming slots received)
      dispatch(upcomingSlotsSuccess(response.data));
    } catch (error) {
      console.error('An error occurred:', error);
      // Dispatch an action for failure (e.g., failed to get upcoming slots)
      dispatch(upcomingSlotsFailure('Failed to get upcoming slots'));
    }
  };
};

export const getTherapistAvailabilitySlotsByTherapistId = (therapistId) => {
  return async (dispatch) => {
    try {
      // Dispatch an action to indicate the request has started
      dispatch({ type: 'AVAILABILITY_SLOTS_REQUEST' });

      // Make an Axios GET request to get therapist availability slots by therapist ID
      const response = await therapistsAxiosApi.get(`${THERAPIST_PUBLIC_API}/therapist/${therapistId}`);
      console.log(response);
      // Dispatch an action for success (e.g., therapist availability slots received)
      dispatch(availabilitySlotsSuccess(response.data));
    } catch (error) {
      console.error('An error occurred:', error);
      // Dispatch an action for failure (e.g., failed to get therapist availability slots)
      dispatch(availabilitySlotsFailure('Failed to get therapist availability slots'));
    }
  };
};


// Define other actions for success and failure as needed
const slotCreationSuccess = (data) => ({ type: 'SLOT_CREATION_SUCCESS', data });
const slotCreationFailure = (error) => ({ type: 'SLOT_CREATION_FAILURE', error });
const addTimesSuccess = (data) => ({ type: 'ADD_TIMES_SUCCESS', data });
const addTimesFailure = (error) => ({ type: 'ADD_TIMES_FAILURE', error });
const slotDeletionSuccess = () => ({ type: 'SLOT_DELETION_SUCCESS' });
const slotDeletionFailure = (error) => ({ type: 'SLOT_DELETION_FAILURE', error });
const timesRemovalSuccess = () => ({ type: 'TIMES_REMOVAL_SUCCESS' });
const timesRemovalFailure = (error) => ({ type: 'TIMES_REMOVAL_FAILURE', error });
const upcomingSlotsSuccess = (data) => ({ type: 'UPCOMING_SLOTS_SUCCESS', data });
const upcomingSlotsFailure = (error) => ({ type: 'UPCOMING_SLOTS_FAILURE', error });
const availabilitySlotsSuccess = (data) => ({ type: 'AVAILABILITY_SLOTS_SUCCESS', data });
const availabilitySlotsFailure = (error) => ({ type: 'AVAILABILITY_SLOTS_FAILURE', error });

