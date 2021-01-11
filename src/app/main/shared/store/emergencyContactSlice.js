import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
//TO DO : Separa esse slice para widget e component pois este slice esta sendo consumido tanto pelo componente quando o widget

export const listEmergencyContact = () => async (dispatch, getState) => {
	dispatch(openLoading())
	var user = getState().auth.user
	return phbApi().get('/emergencyContact/list/' + user.uuid)
		.then(({ data }) => {
			dispatch(closeLoading())
			return dispatch(getEmergencyContactList(data));
		})
		.catch(error => {
			console.log(error)
			return dispatch(closeLoading())
		});
};

const emergencyContactAdapter = createEntityAdapter({});

export const { selectAll: selectEmergencyContact, selectById: selectEmergencyContactById } = emergencyContactAdapter.getSelectors(
	state => state.profile.EmergencyContact
);

const emergencyContactSlice = createSlice({
	name: 'profile/EmergencyContact',
	initialState: [],
	reducers: {
		getEmergencyContactList: {
			reducer: (state, action) => {
				return action.payload
			}
		}
	}
});

export const { getEmergencyContactList } = emergencyContactSlice.actions;

export default emergencyContactSlice.reducer;
