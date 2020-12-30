import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi';

export const getClinics = createAsyncThunk('ClinicApp/clinics/getClinics', async (params, { getState, dispatch }) => {
	const response = await phbApi().get(`/clinic`);
	const data = await response.data;
	return data;
});

export const deleteClinic = createAsyncThunk(
	'ClinicApp/clinics/deleteClinic',
	async (idDeleted, { getState, dispatch }) => {
		console.log('deletando clinica', idDeleted);
		const response = await phbApi().delete(`/clinic`, { params: { id: idDeleted } });
		const data = await response.data;
		if (data) {
			return idDeleted;
		}
	}
);

const clinicAdapter = createEntityAdapter({});

export const { selectAll: selectClinics, selectById: selectClinicById } = clinicAdapter.getSelectors(
	state => state.ClinicApp.clinics
);

const clinicSlice = createSlice({
	name: 'ClinicApp/clinics',
	initialState: clinicAdapter.getInitialState(),
	reducers: {
		setclinicBranchsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},

		setGeoCoordinate: {
			reducer: (state, action) => {
				state.Address.GeoCordinates.Longitude = action.payload.lat;
				state.Address.GeoCordinates.Latitude = action.payload.lng;
			}
		}
	},
	extraReducers: {
		[getClinics.fulfilled]: clinicAdapter.setAll,
		[deleteClinic.fulfilled]: (state, action) => {
			console.log('removendo ', action);
			clinicAdapter.removeOne(state, action.payload);
		}
	}
});

export const { setclinicSearchText, newClinicBranch, setGeoCoordinate } = clinicSlice.actions;

export default clinicSlice.reducer;
