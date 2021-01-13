import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const setIntakeForm = createAsyncThunk('ProfilleApp/Intakeform/setIntakeForm', async (params, { getState, dispatch })  => {
    dispatch(openLoading());
	const response = await phbApi().get('Intakeform/list');
	const data = await response.data;
	data.intakeform = params 
	dispatch(closeLoading());
	return data;
});


const intakeFormAdapter = createEntityAdapter({});


const intakeFormSlice = createSlice({
	name: 'profile/IntakeForm',
	initialState: {},
	reducers: {
		clearIntakeForm: (state, action) => {},
	},
	extraReducers: {
		[setIntakeForm.fulfilled]: (state, action) => action.payload
	}
});

export const { cleanIntakeForm} = intakeFormSlice.actions;

export default intakeFormSlice.reducer;
