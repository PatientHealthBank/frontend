import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import phbApi from 'app/services/phbApi';

import axios from 'axios';

export const geFamilyMembers = createAsyncThunk(
	'FamilyMembersApp/familyMembers/getFamilyMembers',
	async (params, { getState, dispatch }) => {
		dispatch(openLoading());
		const { user } = getState().auth;
		return phbApi()
			.get(`/FamilyMembers/list/${user.uuid}`)
			.then(response => {
				dispatch(closeLoading());
				return response.data;
			})
			.catch(error => {
				dispatch(closeLoading());
			});
	}
);

const familyMembersWidgetAdapter = createEntityAdapter({});

export const {
	selectAll: selectFamilyMembers,
	selectEntities: selectFamilyMembersEntities,
	selectById: selectFamilyMembersById
} = familyMembersWidgetAdapter.getSelectors(state => state.FamilyMembersWidgetApp.familyMembers);

const familyMembersWidgetSlice = createSlice({
	name: 'FamilyMembersWidgetApp/familyMembers',
	initialState: familyMembersWidgetAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[geFamilyMembers.fulfilled]: familyMembersWidgetAdapter.setAll
	}
});

export default familyMembersWidgetSlice.reducer;
