import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getClinicBranch = createAsyncThunk('ClinicBranchsApp/clinicBranch/getClinicBranch', async params => {
	const response = await axios.get('/api/clinic-branchs-app/clinicBranch', { params });
	const data = await response.data;
	return data;
});

export const saveClinicBranch = createAsyncThunk('ClinicBranchsApp/clinicBranch/saveClinicBranch', async clinic => {
	const response = await axios.post('/api/clinic-branchs-app/clinicBranch/save', clinic);
	const data = await response.data;

	return data;
});

const clinicBranchSlice = createSlice({
	name: 'ClinicBranchsApp/clinic',
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
					city:'',
					state: '',
					telephone:'',
					TaxId: ''
				}
			})
		}
	},
	extraReducers: {
		[getClinicBranch.fulfilled]: (state, action) => action.payload,
		[saveClinicBranch.fulfilled]: (state, action) => action.payload
	}
});

export const { newClinicBranch } = clinicBranchSlice.actions;

export default clinicBranchSlice.reducer;
