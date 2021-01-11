import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import phbApi from 'app/services/phbApi';

import axios from 'axios';

export const getCareTeamByAppointment = createAsyncThunk(
	'CareTeamWidgetApp/careTeam/getCareTeamByAppointment',
	async (params, { getState, dispatch }) => {
		dispatch(openLoading());

		const { user } = getState().auth;

		return phbApi()
			.get(`/appointment/${user.currentUser.id}`)
			.then(response => {
				dispatch(closeLoading());
				return response.data;
			})
			.catch(error => {
				dispatch(closeLoading());
			});
	}
);

const careTeamWidgetAdapter = createEntityAdapter({});

export const {
	selectAll: selectCareTeamWidget,
	selectEntities: selectCareTeamEntities,
	selectById: selectCareTeamById
} = careTeamWidgetAdapter.getSelectors(state => state.CareTeamWidgetApp.careTeam);

const careTeamWidgetSlice = createSlice({
	name: 'CareTeamWidgetApp/careTeam',
	initialState: careTeamWidgetAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getCareTeamByAppointment.fulfilled]: careTeamWidgetAdapter.setAll
	}
});

export default careTeamWidgetSlice.reducer;
