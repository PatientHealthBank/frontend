import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getClinicBranch = createAsyncThunk('ClinicApp/clinicBranch/getClinicBranch', async params => {
	const response = await axios.get('/api/clinic-branchs-app/clinicBranch', { params });
	const data = await response.data;
	return data;
});

export const saveClinicBranch = createAsyncThunk('ClinicApp/clinicBranch/saveClinicBranch', async clinic => {
	console.log('savando clinica',clinic)
	const response = await axios.post('/api/clinic-branchs-app/clinicBranch/save', clinic);
	const data = await response.data;

	return data;
});

const clinicBranchSlice = createSlice({
	name: 'ClinicBranchs/clinic',
	initialState: null,
	reducers: {
		newClinicBranch: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					clinicName: '',
					zipcode: '',
					number: '',
					addressLine1: '',
					addressLine2: '',
					city: '',
					geoCordinates: [0, 0],
					state: '',
					telephone: '',
					TaxId: ''
				}
			})
		},
		setGeoCoordinate: {
			reducer: (state, action) => {
				console.log('recebendo do reducer',action.payload)
				state.geoCordinates = action.payload;
			}
		}
	},
	extraReducers: {
		[getClinicBranch.fulfilled]: (state, action) => action.payload,
		[saveClinicBranch.fulfilled]: (state, action) => action.payload
	}
});

export const { newClinicBranch, setGeoCoordinate } = clinicBranchSlice.actions;

export default clinicBranchSlice.reducer;
