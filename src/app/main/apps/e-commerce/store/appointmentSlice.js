import phbApi from 'app/services/phbApi';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const getAppointment = createAsyncThunk('eCommerceApp/appointment/getAppointment', async (params, { getState, dispatch }) => {
	var user = getState().auth.user;
	var appointmentId = params.appointmentId;
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
		newAppointment: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					clinic: '',
					handle: '',
					description:'',
					doctorName: '',
					specialty: null,
					specialtyDescription: '',
					featuredImageId: '',
					meansTransport:'',
					patient: '',
					priority:'',
					date:new Date(),
					firstAppointment: false,
					includeTravelTime: false,
					caregiverAppointment: false,
					notifications: false,
					name: '',
					categories: [],
					tags: [],
					priceTaxExcl: 0,
					priceTaxIncl: 0,
					taxRate: 0,
					comparedPrice: 0,
					quantity: 0,
					sku: '',
					width: '',
					height: '',
					depth: '',
					weight: '',
					extraShippingFee: 0,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getAppointment.fulfilled]: (state, action) => action.payload,
		[updateAppointment.fulfilled]: (state, action) => action.payload
	}
});

export const { newAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;