import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import FuseUtils from '@fuse/utils';
import phbApi from 'app/services/phbApi'

export const getPatient = createAsyncThunk('providerApp/patient/getPatient', async (patientId, { getState, dispatch }) => {
	dispatch(openLoading())
	const response = await phbApi().get('/patient/' + patientId);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

export const getPatientIntakeForms = createAsyncThunk('providerApp/getPatientIntakeForms', async (patientId, { getState, dispatch }) => {
	dispatch(openLoading());
	const response = await phbApi().get("patient/Intakeform/" + patientId);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

export const getPatientAppointments = createAsyncThunk('providerApp/getPatientIntakeForms', async (params, { getState, dispatch }) => {
	dispatch(openLoading());
	const response = await phbApi().get("/appointment" , { params: params });
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

export const getPatientTestsResults = createAsyncThunk('providerApp/getPatientTestsResults', async (patientId, { getState, dispatch }) => {
	dispatch(openLoading());
	const response = await phbApi().get('appointmentTest/appointmentTestResult/' + patientId);
	const data = await response.data.data;
	dispatch(closeLoading());
	return data;
});

const patientSlice = createSlice({
	name: 'providerApp/patient',
	initialState: null,
	reducers: {
		newPatient: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					handle: '',
					description: '',
					categories: [],
					tags: [],
					images: [],
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
		[getPatient.fulfilled]: (state, action) => action.payload,
		[getPatientTestsResults.fulfilled]: (state, action) => { return { ...state, testResults: action.payload } },
		[getPatientIntakeForms.fulfilled]: (state, action) => { return { ...state, intakeForms: action.payload } },
		[getPatientAppointments.fulfilled]: (state, action) => { return { ...state, appointments: action.payload } },
	}
});

export const { newPatient } = patientSlice.actions;

export default patientSlice.reducer;
