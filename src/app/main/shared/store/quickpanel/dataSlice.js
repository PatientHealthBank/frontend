import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

import phbApi from 'app/services/phbApi';

import axios from 'axios';

export const getNotifications = createAsyncThunk('quickPanel/data/getData', async (params, { getState, dispatch }) => {
	const { user } = getState().auth;
	dispatch(openLoading());

	return await phbApi()
		.get(`/notification/list/${user.currentUser.id}`)
		.then(response => {
			dispatch(closeLoading());
			console.log(response.data)
			return response.data;
		})
		.catch(error => {
			dispatch(closeLoading());
		});
});

export const checkRead = createAsyncThunk('quickPanel/data/checkRead', async (params, { getState, dispatch }) => {
	const { user } = getState().auth;
	dispatch(openLoading());
	console.error('params', params);
	return await phbApi()
		.patch(`/notification/${params}`)
		.then(response => {
			dispatch(closeLoading());
			if (response.data) {
				dispatch(getNotifications());
			}
		})
		.catch(error => {
			dispatch(closeLoading());
		});
});
const dataSlice = createSlice({
	name: 'quickPanel/data',
	initialState: {data:[]},
	reducers: {},
	extraReducers: {
		[getNotifications.fulfilled]: (state, action) => action.payload,
		[checkRead.pending]: (state, action) => action.payload
	}
});

export default dataSlice.reducer;
