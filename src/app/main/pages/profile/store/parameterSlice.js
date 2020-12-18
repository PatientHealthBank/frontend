import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

import axios from 'axios';

export const listUserParameters = () => async (dispatch, getState) => {
	dispatch(openLoading());

	Promise.all([
		phbApi().get('/Parameter/Category', { params: { category: 'Email Notification' } }),
		phbApi().get('/Parameter/Category', { params: { category: 'Whe Should We Notify You?' } })
	]).then(data => {
		dispatch(closeLoading());
		return dispatch(getParametersList(data));
	});
};

export const updateUserParameter = () => async (dispatch, getState) => {
	dispatch(openLoading());
	console.log(getState());
	console.log('atualizando usuario');
	// phbApi().patch(`Parameter`,{}).then(data => {
	// 	dispatch(closeLoading())
	// 	return dispatch(getParametersList(data));
	// });
};

const parameterAdapter = createEntityAdapter({});

export const { selectAll: selectParameters, selectById: selectParameterById } = parameterAdapter.getSelectors(
	state => state.profile.parameters
);

const parametersSlice = createSlice({
	name: 'profile/Parameters',
	initialState: [],
	reducers: {
		getParametersList: {
			reducer: (state, action) => {
				return action.payload;
			}
		},
		updateUserParameter: {
			reducer: (state, action) => {
				return action.payload;
			}
		}
	}
});

export const { getParametersList } = parametersSlice.actions;

export default parametersSlice.reducer;

// export const updateParameter = createAsyncThunk('notesApp/notes/createNote', async parameter => {
// 	const response = await axios.post('/Parameter/User', { parameter });
// 	const data = await response.data;
// 	return data;
// });
