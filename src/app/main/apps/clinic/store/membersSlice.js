import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMembers = createAsyncThunk('MembersApp/members/getMembers', async () => {
	const response = await axios.get('/api/members-app/members');
	const data = await response.data;

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
