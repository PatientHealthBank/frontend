import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const addressInfo = () => async (dispatch, getState) => {
	dispatch(openLoading())
	var user = getState().auth.user
	return phbApi().get('/patient/address/list/' + user.currentUser.id)
		.then(({ data }) => {
			dispatch(closeLoading())
			return dispatch(getAddressInformation(data));
		})
		.catch(error => {
			console.log(error)
			return dispatch(closeLoading())
		});
};

const addressInformationAdapter = createEntityAdapter({});

export const { selectAll: addressInformations, selectById: selectAddressInformationById } = addressInformationAdapter.getSelectors(
	state => state.profile.AddressInformation
);

const addressInformationSlice = createSlice({
	name: 'profile/AddressInformation',
	initialState: [],
	reducers: {
		getAddressInformation: {
			reducer: (state, action) => {
				return action.payload
			}
		}
	}
});

export const { getAddressInformation } = addressInformationSlice.actions;

export default addressInformationSlice.reducer;
