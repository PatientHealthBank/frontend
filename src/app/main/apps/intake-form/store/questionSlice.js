import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const setQuestion = createAsyncThunk('ProfilleApp/Intakeform/setIntakeForm', async (params, { getState, dispatch }) => {
	dispatch(openLoading());
	const response = await phbApi().get('Intakeform/question/');
	const data = await response.data;
	data.question = params
	dispatch(closeLoading());
	return data;
});


const QuestionAdapter = createEntityAdapter({});

const DefaultState = {
	selectedQuestion: {
		type: 0,
		title: '',
		options: []
	}
}

const QuestionSlice = createSlice({
	name: 'profile/IntakeForm',
	initialState: {},
	reducers: {
		clearQuestion: (state, action) => DefaultState,
		setQuestion: (state, action) => action.payload,
	},
	extraReducers: {
		[setIntakeForm.fulfilled]: (state, action) => action.payload
	}
});

export const { clearQuestion } = QuestionSlice.actions;

export default QuestionSlice.reducer;
