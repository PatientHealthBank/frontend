import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const getMembers = createAsyncThunk('MembersApp/members/getMembers', async (params, { getState, dispatch })  => {
	dispatch(openLoading());
	var user = getState().auth.user; 
	const response = await phbApi().get('/provider/list/' + user.currentUser.id);
	const data = await response.data.data;  
	dispatch(closeLoading());
	return data;
});

const membersAdapter = createEntityAdapter({});

export const { selectAll: selectMembers, selectById: selectMemberById } = membersAdapter.getSelectors(
	state => state.MembersApp.members
);

const membersSlice = createSlice({
	name: 'MembersApp/members',
	initialState: membersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setMembersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMembers.fulfilled]: membersAdapter.setAll
	}
});

export const { setMembersSearchText } = membersSlice.actions;

export default membersSlice.reducer;
