import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';

import phbApi from 'app/services/phbApi';

const clinicAdapter = createEntityAdapter({});
export const clinicModel = {
	id: null,
	companyName: '',
	score: 0,
	email: '',
	phone: '',
	taxId: '0',
	isClinicBranch: false,
	clinicTypeId: 1,
	userId: 51,
	isActive: true,
	address: {
		addressTypeId: 1,
		addressLine1: '',
		country: '',
		city: '',
		state: '',
		zipCode: '',
		geoCordinates: {
			longitude: '0',
			latitude: '0'
		}
	}
};

export const getClinic = createAsyncThunk('ClinicApp/clinic/getClinic', async ({ clinicId }) => {
	const response = await phbApi().get(`/clinic/${clinicId}`);
	const data = await response.data;
	return data;
});

export const saveClinic = createAsyncThunk(
	'ClinicApp/clinicBranch/saveClinicBranch',
	async (clinic, { getState, dispatch }) => {
		const response = await phbApi().post(`/clinic`, clinic);
		const data = await response.data;
		if (data) {
			dispatch(showMessage({ message: 'Clinic saved' }));
			return data;
		}
	}
);

export const updateClinic = createAsyncThunk(
	'ClinicApp/clinicBranch/updateClinicBranch',
	async (clinic, { getState, dispatch }) => {
		const response = await phbApi().put(`/clinic`, clinic);
		const data = await response.data;
		if (data) {
			dispatch(showMessage({ message: 'Clinic updated' }));
			return data;
		}
	}
);

const clinicSlice = createSlice({
	name: 'ClinicApp/clinic',
	initialState: null,
	reducers: {
		setGeoCoordinate: {
			reducer: (state, action) => {
				state.geoCordinates = action.payload;
			}
		},
		newClinic: {
			reducer: (state, action) => action.payload,
			prepare: event => ({ payload: clinicModel })
		}
	},
	extraReducers: {
		[getClinic.fulfilled]: (state, action) => action.payload,
		[saveClinic.fulfilled]: (state, action) => action.payload,
		[updateClinic.pending]: (state, action) => action.payload
	}
});

export const { setGeoCoordinate, newClinic } = clinicSlice.actions;

export default clinicSlice.reducer;
