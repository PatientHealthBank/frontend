import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const listFamilyMembers = () => async (dispatch, getState) => {
    dispatch(openLoading())
	var user = getState().auth.user
	
	return phbApi().get('/FamilyMembers/list/'+user.uuid)
		.then(({data}) => {
			dispatch(closeLoading())
			return dispatch(getFamilyMembersList(data));
		})
		.catch(error => {
            return dispatch(closeLoading())
		});
};

const familyMembersAdapter = createEntityAdapter({});

export const { selectAll: selectFamilyMembers, selectById: selectFamilyMembersById } = familyMembersAdapter.getSelectors(
	state => state.profile.FamilyMembers
);

const familyMembersSlice = createSlice({
	name: 'apps/FamilyMembers',
	initialState: [],
	reducers: {
        getFamilyMembersList:{reducer: (state, action) => {
            return action.payload
        }}
	}
});

export const { getFamilyMembersList } = familyMembersSlice.actions;

export default familyMembersSlice.reducer;
