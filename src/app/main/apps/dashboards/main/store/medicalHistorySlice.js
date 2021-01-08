import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const getMedicalHistory = createAsyncThunk('MedicalHistoryWidgetApp/medicalHistory/getMedicalHistory', async (params, { getState, dispatch }) => {
	
	dispatch(openLoading());

	const { user } = getState().auth;

	return phbApi()
		.get('/patient/Intakeform/' + user.currentUser.id)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			dispatch(closeLoading());
		});
});

const medicalHistoryAdapter = createEntityAdapter({});

export const {
	selectAll: selectMedicalHistoryWidget,
	selectEntities: selectMedicalHistoryEntities,
	selectById: selectMedicalHistoryById
} = medicalHistoryAdapter.getSelectors(state => state.MedicalHistoryWidgetApp.medicalHistory);

const medicalHistorySlice = createSlice({
	name: 'MedicalHistoryWidgetApp/medicalHistory',
	initialState: [],
	reducers: {	},
	extraReducers: {
		[getMedicalHistory.fulfilled]: (state, action) => action.payload
	}
});

export default medicalHistorySlice.reducer;
