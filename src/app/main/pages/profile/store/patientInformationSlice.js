import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const patientInfo = () => async (dispatch, getState) => {
	dispatch(openLoading())
	var user = getState().auth.user
	return phbApi().get('/patient/list/' + user.currentUser.id)
		.then(({ data }) => {
			dispatch(closeLoading())
			return dispatch(getPatientInformation(data));
		})
		.catch(error => {
			console.log(error)
			return dispatch(closeLoading())
		});
};

const patientInformationtAdapter = createEntityAdapter({});

export const { selectById: selectPatientById } = patientInformationtAdapter.getSelectors(
	state => state.profile.PatientInformation
);

const patientInformationSlice = createSlice({
	name: 'profile/PatientInformation',
	initialState: null,
	reducers: {
		getPatientInformation: {
			reducer: (state, action) => {
				return action.payload
			}
		}
	}
});

export const { getPatientInformation } = patientInformationSlice.actions;

export default patientInformationSlice.reducer;
