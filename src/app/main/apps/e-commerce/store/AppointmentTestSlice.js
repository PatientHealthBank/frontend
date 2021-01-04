import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const getAppointmentTests = createAsyncThunk('AppointmentApp/getAppointmentTests', async (params, { getState, dispatch }) => {
	dispatch(openLoading());
	const response = await phbApi().get('/appointmentTest/' + params);
	const data = await response.data.data;
	dispatch(closeLoading());
	return data;
});

export const saveAppointmentTest = createAsyncThunk('AppointmentApp/AppointmentTest', async (appointmentTest, { getState, dispatch }) => {
	dispatch(openLoading());
	const response = await phbApi().post('/appointmentTest', appointmentTest);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

export const deleteAppointmentTest = createAsyncThunk('AppointmentApp/appointmentTest', async (appointmentTest, { getState, dispatch }) => {
	dispatch(openLoading());
	const response = await phbApi().post('/appointmentTest/' + appointmentTest.id, appointmentTest);
	await response.data;
	dispatch(closeLoading());
	return appointmentTest.id;
});

export const addTest = createAsyncThunk('AppointmentApp/addTest', async (newTest, { getState, dispatch }) => {
	dispatch(openLoading());
	var user = getState().auth.user;

	var formData = new FormData();
	formData.append("file", newTest.fileTest);

	newTest.patientId = user.currentUser.id;
	delete newTest.id

	const fileResponse = await phbApi().post('/appointmentTest/testFile', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	newTest.urlFile = fileResponse.data.urlFile;
	newTest.type = fileResponse.data.type;
	newTest.size = fileResponse.data.size;
	const response = await phbApi().post('/appointmentTest', newTest);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

const appointmentTestsAdapter = createEntityAdapter({});

export const { selectAll: selectAppointmentTests, selectById: selectAppointmentTestById } = appointmentTestsAdapter.getSelectors(
	state => state.AppointmentsApp.appointmentTest.files
);

const appointmentTestsSlice = createSlice({
	name: 'AppointmentTestsApp/appointmentTests',
	initialState: {
		files: [],
		entity: {
			id: 0,
			name: '',
			urlFile: '',
			type: '',
			owner: '',
			size: '',
			patientId: '',
			appointmentId: ''
		},
		testDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	},
	reducers: {
		newAppointmentTest: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					files: [],
					entity: {
						id: 0,
						name: '',
						urlFile: '',
						type: '',
						owner: '',
						size: '',
						patientId: '',
						appointmentId: ''
					}
				}
			})
		},
		openNewTestDialog: {
			prepare: test => {
				const payload = {
					type: 'new',
					props: {
						open: true
					},
					data: {

					}
				};
				return { payload };
			},
			reducer: (state, action) => {
				state.testDialog = action.payload;
			}
		},
		closeNewTestDialog: (state, action) => {
			state.testDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[addTest.fulfilled]: (state, action) => { return { ...state, files: [...state.files, action.payload] } },
		[getAppointmentTests.fulfilled]: (state, action) => { return { ...state, files: action.payload } },
		[saveAppointmentTest.fulfilled]: (state, action) => action.payload,
		[deleteAppointmentTest.fulfilled]: (state, action) => { return { ...state, files: state.files.filter(x => x.id != action.payload) } },
	}
});

export const {
	openNewTestDialog,
	closeNewTestDialog
} = appointmentTestsSlice.actions;

export default appointmentTestsSlice.reducer;