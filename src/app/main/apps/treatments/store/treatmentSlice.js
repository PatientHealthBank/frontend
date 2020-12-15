import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getTreatment = createAsyncThunk('TreatmentsApp/treatment/getTreatment', async params => {
	const response = await axios.get('/api/treatments-app/treatment', { params });
	const data = await response.data;

	return data;
});

export const saveTreatment = createAsyncThunk('TreatmentsApp/treatment/saveTreatment', async treatment => {
	const response = await axios.post('/api/treatments-app/treatment/save', treatment);
	const data = await response.data;

	return data;
});

const treatmentSlice = createSlice({
	name: 'TreatmentsApp/treatment',
	initialState: null,
	reducers: {
		newTreatment: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					patient:'Jhon Doe',
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
		[getTreatment.fulfilled]: (state, action) => action.payload,
		[saveTreatment.fulfilled]: (state, action) => action.payload
	}
});

export const { newTreatment } = treatmentSlice.actions;

export default treatmentSlice.reducer;
