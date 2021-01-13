import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import FuseUtils from '@fuse/utils';
import DateFnsUtils from '@date-io/date-fns';

export const getMember = createAsyncThunk('MembersApp/member/getMember', async (membersId, { getState, dispatch }) => {
	dispatch(openLoading());
	const response = await phbApi().get('/provider/' + membersId);
	const data = await response.data.data;
	dispatch(closeLoading());
	return data;
}); 

export const saveMember = createAsyncThunk('MembersApp/member/saveMember', async (member, { getState, dispatch }) => {
	dispatch(openLoading());
	var user = getState().auth.user;
	const response = await phbApi().post('/provider/' + user.currentUser.id, member);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

export const updateMember = createAsyncThunk('MembersApp/member/updateMember', async (member, { getState, dispatch }) => {
	dispatch(openLoading());
	var user = getState().auth.user;
	console.log(member)
	if(member.photoURL){
		if(member.imageUrl){
			await phbApi().delete("/Invoices/file?imageName="+member.imageUrl);
		}
		var formData = new FormData();
		formData.append("file", member.photoURL);
		await phbApi().post("/Invoices/file", formData, { headers: {
			'Content-Type': 'multipart/form-data'}
		}).then(res => {
			member.imageUrl = "https://phbbucket.s3.us-east-2.amazonaws.com/profileImages/"+res.data;
		}).
		catch(err => {
			dispatch(closeLoading());
			return err;
		});
	}
	const response = await phbApi().put('/provider/' + user.currentUser.id, member);
	const data = await response.data;
	dispatch(closeLoading());
	return data;
});

export const deleteMember = createAsyncThunk('MembersApp/member/deleteMember', async (memberId, { getState, dispatch }) => {
	dispatch(openLoading());
	const response = await phbApi().delete('/provider/' + memberId);
	const data = await response.data;
	dispatch(closeLoading());
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
					id: 0,
					name: '',
					licenseNumber: '',
					phone: '',
					email: '',
					npi: '',
					description: '',
					rating: 0,
					imageUrl: '',
					telemedicine: false,
					startJob: '08:00',
					endJob: '18:00',
					appointmentInterval: 0,
					genderId: 0,
					userId: 0,
					taxId: "",
					addressId: 0,
					addressTypeId: 1,
					addressLine1: '',
					addressLine2: '',
					country: '',
					city: '',
					state: '',
					zipCode: '',
					longitude: '',
					latitude: '',
					specialty: [], 
					clinicalInterest: [], 
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
