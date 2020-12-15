import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getClinicBranchs = createAsyncThunk('ClinicBranchsApp/clinic/getClinicBranchs', async () => {
	const response = await axios.get('/api/clinic-branchs-app/clinicBranchs');
	const data = await response.data;

	return data;
});

const clinicBranchsAdapter = createEntityAdapter({});

export const { selectAll: selectClinicBranchs, selectById: selectClinicBranchsById } = clinicBranchsAdapter.getSelectors(
	state => state.ClinicBranchsApp.clinicBranchs
);

const clinicBranchsSlice = createSlice({
	name: 'ClinicBranchsApp/clinicBranchs',
	initialState: clinicBranchsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setclinicBranchsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getClinicBranchs.fulfilled]: clinicBranchsAdapter.setAll
	}
});

export const { setclinicBranchsSearchText } = clinicBranchsSlice.actions;

export default clinicBranchsSlice.reducer;