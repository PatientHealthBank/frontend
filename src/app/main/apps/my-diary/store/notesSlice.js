import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const getNotes = createAsyncThunk('notesApp/notes/getNotes', async (params, { getState, dispatch })  => {
    dispatch(openLoading());
	var user = getState().auth.user; 
	const response = await phbApi().get('/note/patient/'+user.currentUser.id);
	const data = await response.data.notes; 
	dispatch(closeLoading());
	return data;
});

export const createNote = createAsyncThunk('notesApp/notes/createNote', async (note, { getState, dispatch })  => {
	dispatch(openLoading());
	var user = getState().auth.user; 
	note.reminder = new Date();
	note.time = new Date();
	note.patientId = user.currentUser.id;

	const response = await phbApi().post('/note/patient', note);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

export const updateNote = createAsyncThunk('notesApp/notes/updateNote', async (note, { getState, dispatch })  => {
	dispatch(openLoading());
	var user = getState().auth.user; 
	note.time = new Date();
	note.patientId = user.currentUser.id;

	const response = await phbApi().put('/note/patient', note);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

export const removeNote = createAsyncThunk('notesApp/notes/removeNote',  async (noteId, { getState, dispatch })  => {
	dispatch(openLoading());
	const response = await phbApi().delete('/note/'+ noteId);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

const notesAdapter = createEntityAdapter({});

export const {
	selectAll: selectNotes,
	selectEntities: selectNotesEntities,
	selectById: selectNoteById
} = notesAdapter.getSelectors(state => state.notesApp.notes);

const notesSlice = createSlice({
	name: 'notesApp/notes',
	initialState: notesAdapter.getInitialState({ searchText: '', noteDialogId: null, variateDescSize: false }),
	reducers: {
		setNotesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		resetNotesSearchText: (state, action) => {
			state.searchText = '';
		},
		toggleVariateDescSize: (state, action) => {
			state.variateDescSize = !state.variateDescSize;
		},
		openNoteDialog: (state, action) => {
			state.noteDialogId = action.payload;
		},
		closeNoteDialog: (state, action) => {
			state.noteDialogId = action.null;
		}
	},
	extraReducers: {
		[getNotes.fulfilled]: notesAdapter.setAll,
		[createNote.fulfilled]: notesAdapter.addOne,
		[updateNote.fulfilled]: notesAdapter.upsertOne,
		[removeNote.fulfilled]: notesAdapter.removeOne
	}
});

export const {
	setNotesSearchText,
	resetNotesSearchText,
	toggleVariateDescSize,
	openNoteDialog,
	closeNoteDialog
} = notesSlice.actions;

export default notesSlice.reducer;
