import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import phbApi from 'app/services/phbApi'

import axios from 'axios';

export const getAppointments = createAsyncThunk('AppointmentsWidgetApp/appointments/getAppointments', async (params, { getState, dispatch }) => {

	const { user } = getState().auth;

	return phbApi().get('/appointment/'+user.uuid)
		.then(response => {
			return response.data;
		})
		.catch(error => {
            return dispatch(closeLoading())
		});
});

const appointmentWidgetAdapter = createEntityAdapter({});

export const {
	selectAll: selectAppointmentsWidget,
	selectEntities: selectAppointmentsEntities,
	selectById: selectAppointmentsById
} = appointmentWidgetAdapter.getSelectors(state => state.AppointmentWidgetApp.appointments);

const appointmentsWidgetSlice = createSlice({
	name: 'AppointmentsWidgetApp/appointments',
	initialState: appointmentWidgetAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getAppointments.fulfilled]: appointmentWidgetAdapter.setAll
	}
});

export default appointmentsWidgetSlice.reducer;
