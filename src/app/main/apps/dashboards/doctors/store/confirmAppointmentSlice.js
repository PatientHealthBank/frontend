import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
	name: 'confirmAppointment/state',
	initialState: {},
	reducers: {
		setConfirmAppointment: (state, action) => action.payload,
		removeConfirmAppointment: (state, action) => {}
	}
});

export const { setConfirmAppointment, removeConfirmAppointment } = stateSlice.actions;

export default stateSlice.reducer;
