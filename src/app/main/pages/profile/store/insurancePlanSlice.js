import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const insurancePlanInfo = () => async (dispatch, getState) => {
	dispatch(openLoading())
	var user = getState().auth.user
	return phbApi().get('/insurancePlan/list/' + user.currentUser.id)
		.then(({ data }) => {
			dispatch(closeLoading())
			return dispatch(getInsurancePlan(data));
		})
		.catch(error => {
			console.log(error)
			return dispatch(closeLoading())
		});
};

const insurancePlanAdapter = createEntityAdapter({});

export const { selectAll: insurancePlans, selectById: selectInsurancePlanById } = insurancePlanAdapter.getSelectors(
	state => state.profile.InsurancePlan
);

const insurancePlanSlice = createSlice({
	name: 'profile/InsurancePlan',
	initialState: [],
	reducers: {
		getInsurancePlan: {
			reducer: (state, action) => {
				return action.payload
			}
		}
	}
});

export const { getInsurancePlan } = insurancePlanSlice.actions;

export default insurancePlanSlice.reducer;
