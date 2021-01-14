import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const caregiverInfo = () => async (dispatch, getState) => {
	dispatch(openLoading())
	var user = getState().auth.user
	return phbApi().get('/Caregiver/list/all')
		.then(({ data }) => {
			dispatch(closeLoading())
			return dispatch(getCaregiverInformation(data));
		})
		.catch(error => {
			console.log(error)
			return dispatch(closeLoading())
		});
};

const caregiverInformationAdapter = createEntityAdapter({});

export const { selectAll: caregiverInformations, selectById: selectCaregiverInformationById } = caregiverInformationAdapter.getSelectors(
	state => state.profile.CaregiverInformation
);

const caregiverInformationSlice = createSlice({
	name: 'profile/CaregiverInformation',
	initialState: [],
	reducers: {
		getCaregiverInformation: {
			reducer: (state, action) => {
				return action.payload
			}
		}
	}
});

export const { getCaregiverInformation } = caregiverInformationSlice.actions;

export default caregiverInformationSlice.reducer;
