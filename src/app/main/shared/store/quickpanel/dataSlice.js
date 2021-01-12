import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

import phbApi from 'app/services/phbApi';

import axios from 'axios';

export const getNotifications = createAsyncThunk('quickPanel/data/getData', async (params, { getState, dispatch }) => {
	const { user } = getState().auth;
	dispatch(openLoading());

	const response = await phbApi().get(`/notification/list/${user.currentUser.id}`);
	const data = await response.data;
	dispatch(closeLoading());

	return data;
});

const dataSlice = createSlice({
	name: 'quickPanel/data',
	initialState: null,
	reducers: {},
	extraReducers: {
		[getNotifications.fulfilled]: (state, action) => action.payload
	}
});

export default dataSlice.reducer;
