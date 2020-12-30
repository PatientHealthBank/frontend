import phbApi from 'app/services/phbApi';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const getAppointment = createAsyncThunk('eCommerceApp/appointment/getAppointment', async (params, { getState, dispatch }) => {
	var user = getState().auth.user;
	var appointmentId = params.productId;
	const response = await phbApi().get('/appointment/getAppointment/' + appointmentId);
	const data = await response.data;
	console.log(data);

	return data;
});

export const updateAppointment = createAsyncThunk('eCommerceApp/appointment/updateAppointment', async (appointment, { dispatch }) => {
	dispatch(openLoading())
	const response = await phbApi().put('/appointment', appointment);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});
const appointmentAdapter = createEntityAdapter({});

const appointmentSlice = createSlice({
	name: 'e-commerce/Appointment',
	initialState: appointmentAdapter.getInitialState({}),
	// initialState: null,
	reducers: {
	},
	extraReducers: {
		[getAppointment.fulfilled]: (state, action) => action.payload,
		[updateAppointment.fulfilled]: (state, action) => action.payload
	}
});

export default appointmentSlice.reducer;