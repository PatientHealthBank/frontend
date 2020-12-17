import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const listAllergies = () => async (dispatch, getState) => {
    dispatch(openLoading())
    var user = getState().auth.user
	return phbApi().get('/allergies/list/'+user.currentUser.id)
		.then(({data}) => {
			dispatch(closeLoading())
			return dispatch(getAllergiesList(data));
		})
		.catch(error => {
            return dispatch(closeLoading())
		});
};

const allergiesAdapter = createEntityAdapter({});

export const { selectAll: selectAllergies, selectById: selectAllergiesById } = allergiesAdapter.getSelectors(
	state => state.profile.Allergies
);

const allergiesSlice = createSlice({
	name: 'profile/Allergies',
	initialState: [],
	reducers: {
        getAllergiesList:{reducer: (state, action) => {
            return action.payload
        }}
	}
});

export const { getAllergiesList } = allergiesSlice.actions;

export default allergiesSlice.reducer;
