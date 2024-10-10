import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  complaints: [],
};

export const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    addComplaint: (state, action) => {
      state.complaints.push(action.payload);
    },
    updateComplaint: (state, action) => {
      const { id, updatedData } = action.payload;
      const complaintToUpdate = state.complaints.find(complaint => complaint.id === id);
      if (complaintToUpdate) {
        Object.assign(complaintToUpdate, updatedData);
      }
    },
    removeComplaint: (state, action) => {
      const idToRemove = action.payload;
      state.complaints = state.complaints.filter(complaint => complaint.id !== idToRemove);
    },
  },
});

export const { addComplaint, updateComplaint, removeComplaint } = complaintSlice.actions;

export default complaintSlice.reducer;
