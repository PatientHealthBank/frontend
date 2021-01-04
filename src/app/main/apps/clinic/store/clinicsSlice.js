import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

import phbApi from 'app/services/phbApi';

export const getClinics = createAsyncThunk('ClinicApp/clinics/getClinics', async (params, { getState, dispatch }) => {
	dispatch(openLoading());
	return phbApi()
		.get(`/clinic`)
		.then(response => {
			dispatch(closeLoading());
			return response.data;
		})
		.catch(error => {
			dispatch(showMessage({ message: error.message }));
			dispatch(closeLoading());
		});
});

export const deleteClinic = createAsyncThunk(
	'ClinicApp/clinics/deleteClinic',
	async (idDeleted, { getState, dispatch }) => {
		dispatch(openLoading());

		console.log('deletando clinica', idDeleted);
		return phbApi()
			.delete(`/clinic`, { params: { id: idDeleted } })
			.then(response => {
				dispatch(closeLoading());

				if (response.data) {
					return idDeleted;
				}
			})
			.catch(error => {
				dispatch(showMessage({ message: error.message }));
				dispatch(closeLoading());
			});
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
