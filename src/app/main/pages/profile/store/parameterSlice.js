import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import phbApi from 'app/services/phbApi';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const getParametersList = createAsyncThunk(
	'parameters/users/getParametersList',
	async (params, { getState, dispatch }) => {
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
		const response = await phbApi().put('/Parameter/users/UpdateStatusParameter/', params);
		const data = await response.data;
		return data;
	}
);
const parametersAdapter = createEntityAdapter({});

const parametersSlice = createSlice({
	name: 'parameters/users',
	initialState: {
		loading: "",
		error: "",
		data: []
	  },

	reducers: {
		updateParameter: {
			reducer: (state, action) => {

				const index = state.data.findIndex(x =>x.name == action.payload.name)
				state.data[index].isActive =  !action.payload.isActive 
				
			}
		}
	},
	extraReducers: {
		[getParametersList.fulfilled]: (state, action) => {
			state.data = action.payload
		},
		[updateStatusParameter.pending]: (state, action) => action.payload
	}
});

export const { updateParameter } = parametersSlice.actions;

export default parametersSlice.reducer;
