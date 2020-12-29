import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import phbApi from 'app/services/phbApi';

export const getClinic = createAsyncThunk(
	'ClinicApp/clinic/getClinic',
	async (params, { getState, dispatch }) => {
		const { user } = getState().auth;

		const response = await phbApi().get(`/clinic/${user.uuid}`);
		const data = await response.data;
		return data;
	// 		const response = await axios.get('/api/clinic-branchs-app/clinicBranchs');
	// const data = await response.data;
	// 		console.log('obtendo data',data)

	// return data;

	}
);

const clinicAdapter = createEntityAdapter({});

export const { selectAll: selectClinic, selectById: selectClinicById } = clinicAdapter.getSelectors(
	state => state.ClinicApp.clinic
);

const clinicSlice = createSlice({
	name: 'ClinicApp/clinic',
	initialState: clinicAdapter.getInitialState({
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
		[getClinic.fulfilled]: clinicAdapter.addOne
	}
});

export const { setclinicSearchText } = clinicSlice.actions;

export default clinicSlice.reducer;