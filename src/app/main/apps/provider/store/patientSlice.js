import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getPatient = createAsyncThunk('providerApp/patient/getPatient', async params => {
	const response = await axios.get('/api/provider-app/patient', { params });
	const data = await response.data;

	return data;
});

export const savePatient = createAsyncThunk('providerApp/patient/savePatient', async patient => {
	const response = await axios.post('/api/provider-app/patient/save', patient);
	const data = await response.data;

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
		[savePatient.fulfilled]: (state, action) => action.payload
	}
});

export const { newPatient } = patientSlice.actions;

export default patientSlice.reducer;
