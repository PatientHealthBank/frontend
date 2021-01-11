import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const listVaccines = () => async (dispatch, getState) => {
    dispatch(openLoading())
    var user = getState().auth.user
	return phbApi().get('/patient/immunizations/'+user.currentUser.id)
		.then(({data}) => {
			dispatch(closeLoading())
			return dispatch(getVaccinesList(data));
		})
		.catch(error => {
            console.log(error)
            return dispatch(closeLoading())
		});
};

const vaccinesAdapter = createEntityAdapter({});

export const { selectAll: selectVaccines, selectById: selectVaccinesById } = vaccinesAdapter.getSelectors(
	state => state.profile.Vaccines
);

const vaccinesSlice = createSlice({
	name: 'profile/Vaccines',
	initialState: [],
	reducers: {
        getVaccinesList:{reducer: (state, action) => {
            return action.payload
        }}
	}
});

export const { getVaccinesList } = vaccinesSlice.actions;

export default vaccinesSlice.reducer;
