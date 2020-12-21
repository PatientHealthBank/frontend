import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import phbApi from 'app/services/phbApi';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const getParametersList = createAsyncThunk(
	'parameters/users/getParametersList',
	async (params, { getState, dispatch }) => {
		console.log('disparando pra api');
		const { user } = getState().auth;
		const response = await phbApi().get('/Parameter/User', { params: { UserId: user.uuid } });
		const data = await response.data;
		return data;
	}
);

export const updateStatusParameter = createAsyncThunk(
	'parameters/users/updateStatusParameter',
	async (params, { getState, dispatch }) => {
		const { user } = getState().auth;

		const response = await phbApi().get('/Parameter/users/UpdateStatusParameter/', {
			params: {
				userId: user.uuid,
				category: params.name,
				isActive:params.isActive
				
			}
		});
		const data = await response.data;
		return data;
	}
);
const parametersAdapter = createEntityAdapter({});

const parametersSlice = createSlice({
	name: 'parameters/users',
	initialState: null,

	reducers: {
		updateParameter: {
			reducer: (state, action) => {
				console.log('atualizando parameter', state, action);
				// return !action.payload;
			}
		}
	},
	extraReducers: {
		[getParametersList.fulfilled]: (state, action) => action.payload
	}
});

export const { updateParameter } = parametersSlice.actions;

export default parametersSlice.reducer;
