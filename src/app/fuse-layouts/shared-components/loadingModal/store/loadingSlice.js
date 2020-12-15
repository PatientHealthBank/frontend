import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
	name: 'loadingModal/state',
	initialState: false,
	reducers: {
		toggleLoading: (state, action) => !state,
		openLoading: (state, action) => true,
		closeLoading: (state, action) => false
	}
});

export const { toggleLoading, openLoading, closeLoading } = stateSlice.actions;

export default stateSlice.reducer;
