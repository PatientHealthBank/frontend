import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import { getClinics } from './../store/clinicsSlice';
import phbApi from 'app/services/phbApi';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

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

export const getClinic = createAsyncThunk('ClinicApp/clinic/getClinic', async ({ clinicId }, { dispatch }) => {
	dispatch(openLoading());
	return phbApi()
		.get(`/clinic/${clinicId}`)
		.then(response => {
			dispatch(closeLoading());
			dispatch(getClinics())
			return response.data;
		})
		.catch(error => {
			dispatch(showMessage({ message: error.message }));
			dispatch(closeLoading());
		});
});

export const saveClinic = createAsyncThunk(
	'ClinicApp/clinicBranch/saveClinicBranch',
	async (clinic, { getState, dispatch }) => {
		dispatch(openLoading());
		return phbApi()
			.post(`/clinic`, clinic)
			.then(response => {
				dispatch(closeLoading());
				dispatch(showMessage({ message: "Clinica cadastrada" }));

				dispatch(getClinics())
				return response.data;
			})
			.catch(error => {
				dispatch(showMessage({ message: error.message }));
				dispatch(closeLoading());
			});
	}
);

export const updateClinic = createAsyncThunk(
	'ClinicApp/clinicBranch/updateClinicBranch',
	async (clinic, { getState, dispatch }) => {
		dispatch(openLoading());

		return phbApi()
			.put(`/clinic`, clinic)
			.then(response => {
				dispatch(closeLoading());
				dispatch(showMessage({ message: "Clinica atualizada" }));

				dispatch(getClinics())
				return response.data;
			})
			.catch(error => {
				dispatch(showMessage({ message: error.message }));
				dispatch(closeLoading());
			});

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
