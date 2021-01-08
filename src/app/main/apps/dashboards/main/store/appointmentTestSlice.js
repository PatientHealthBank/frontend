import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import phbApi from 'app/services/phbApi'

import axios from 'axios';

export const getAppointmentTest = createAsyncThunk(
	'AppointmentTestWidgetApp/appointmentTest/getAppointmentTest',
	async (params, { getState, dispatch }) => {

		dispatch(openLoading());
		
		const { user } = getState().auth;
		
		return phbApi()
			.get('/appointmentTest/appointmentTestResult/' + user.currentUser.id)
			.then(response => {
				return response.data.data;
			})
			.catch(error => {
				dispatch(closeLoading());
			});
	}
);

const appointmentTestAdapter = createEntityAdapter({});

export const {
	selectAll: selectAppointmentTestWidget,
	selectEntities: selectAppointmentTestEntities,
	selectById: selectAppointmentTestById
} = appointmentTestAdapter.getSelectors(state => state.AppointmentTestWidgetApp.appointmentTest);

const appointmentTestSlice = createSlice({
	name: 'AppointmentTestWidgetApp/appointmentTest',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getAppointmentTest.fulfilled]: (state, action) => action.payload
	}
});

export default appointmentTestSlice.reducer;
