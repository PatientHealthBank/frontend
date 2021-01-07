import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const patientList = () => async (dispatch, getState) => {
	console.log("data")
    dispatch(openLoading())
    var user = getState().auth.user
	return phbApi().get('/provider/getPatients/'+user.currentUser.id)
		.then(({data}) => {
			dispatch(closeLoading())
			return dispatch(getPatientList(data));
		})
		.catch(error => {
            return dispatch(closeLoading())
		});
};

const patientsAdapter = createEntityAdapter({});
export const {  } = patientsAdapter.getSelectors(
	state => state.PatientsApp.patients
);
const patientsSlice = createSlice({
	name: 'provider/Patients',
	initialState: [],
	reducers: {
        getPatientList:{reducer: (state, action) => {
            return action.payload
        }}
	}
});
export const { getPatientList } = patientsSlice.actions;
export default patientsSlice.reducer;