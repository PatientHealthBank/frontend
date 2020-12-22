import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';



export const getStrength = () => async (dispatch, getState) => {
    dispatch(openLoading())
    var user = getState().auth.user
	return phbApi().get('/patient/strength/'+user.currentUser.id)
		.then(({data}) => {
			console.log(data)
			dispatch(closeLoading())
			return dispatch(setStrength(data));
		})
		.catch(error => {
            return dispatch(closeLoading())
		});
};

const strengthAdapter = createEntityAdapter({});

export const { selectAll: selectStrength, selectById: selectAllergiesById } = strengthAdapter.getSelectors(
	state => state.profile.Strength
);

const strengthSlice = createSlice({
	name: 'profile/Strength',
	initialState: {},
	reducers: {
        setStrength:{reducer: (state, action) => {
            return action.payload
        }}
	}
});

export const { setStrength } = strengthSlice.actions;

export default strengthSlice.reducer;
