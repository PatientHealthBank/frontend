import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTreatments = createAsyncThunk('TreatmentsApp/treatments/getTreatments', async () => {
	const response = await axios.get('/api/treatments-app/treatments');
	const data = await response.data;

	return data;
});

const treatmentsAdapter = createEntityAdapter({});

export const { selectAll: selectTreatments, selectById: selectProductById } = treatmentsAdapter.getSelectors(
	state => state.TreatmentsApp.treatments
);

const treatmentsSlice = createSlice({
	name: 'TreatmentsApp/treatments',
	initialState: treatmentsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setTreatmentsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getTreatments.fulfilled]: treatmentsAdapter.setAll
	}
});

export const { setTreatmentsSearchText } = treatmentsSlice.actions;

export default treatmentsSlice.reducer;
