import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getMember = createAsyncThunk('MembersApp/member/getMember', async params => {
	const response = await axios.get('/api/members-app/member', { params });
	const data = await response.data;
	return data;
});

export const saveMember = createAsyncThunk('MembersApp/member/saveMember', async member => {
	const response = await axios.post('/api/members-app/member/save', member);
	const data = await response.data;

	return data;
});

const memberSlice = createSlice({
	name: 'MembersApp/member',
	initialState: null,
	reducers: {
		newMember: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					email: '',
					occupation: '',
					profileType: '',
					clinic: '',
					admAccess: '',
					profileImage: '',
					actions:''
				}
			})
		}
	},
	extraReducers: {
		[getMember.fulfilled]: (state, action) => action.payload,
		[saveMember.fulfilled]: (state, action) => action.payload
	}
});

export const { newMember } = memberSlice.actions;

export default memberSlice.reducer;
