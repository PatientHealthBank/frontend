import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPatients = createAsyncThunk('providerApp/patients/getPatients', async () => {
	const response = await axios.get('/api/provider-app/patients');

	const data = await response.data;

	return data;
});

const patientsAdapter = createEntityAdapter({});

export const { selectAll: selectPatients, selectById: selectPatientById } = patientsAdapter.getSelectors(
	state => state.providerApp.patients
);

const patientsSlice = createSlice({
	name: 'providerApp/patients',
	initialState: patientsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setPatientsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getPatients.fulfilled]: patientsAdapter.setAll
	}
});

export const { setPatientsSearchText } = patientsSlice.actions;

export default patientsSlice.reducer;
