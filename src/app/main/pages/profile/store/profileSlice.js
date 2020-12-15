import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProfile = createAsyncThunk('profile/Profile/getProfile', async params => {
	const response = await axios.get('/api/profile/about', { params });
	const data = await response.data;

	return data;
});

export const saveProfile = createAsyncThunk('profile/Profile/saveProfile', async Profile => {
	const response = await axios.post('/api/profile/about/save', Profile);
	const data = await response.data;

	return data;
});

const ProfileSlice = createSlice({
	name: 'profile/about',
	initialState: null,
	reducers: {
		newProfile: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					handle: '',
					description: '',
					categories: [],
					tags: [],
					images: [],
					priceTaxExcl: 0,
					priceTaxIncl: 0,
					taxRate: 0,
					comparedPrice: 0,
					quantity: 0,
					sku: '',
					width: '',
					height: '',
					depth: '',
					weight: '',
					extraShippingFee: 0,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getProfile.fulfilled]: (state, action) => action.payload,
		[saveProfile.fulfilled]: (state, action) => action.payload
	}
});

export const { newProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
