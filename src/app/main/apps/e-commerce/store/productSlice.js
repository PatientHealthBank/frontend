import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async params => {
	const response = await axios.get('/api/e-commerce-app/product', { params });
	const data = await response.data;

	return data;
});

export const saveProduct = createAsyncThunk('eCommerceApp/product/saveProduct', async product => {
	const response = await axios.post('/api/e-commerce-app/product/save', product);
	const data = await response.data;

	return data;
});

const productSlice = createSlice({
	name: 'eCommerceApp/product',
	initialState: null,
	reducers: {
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					clinic: '',
					handle: '',
					description:'',
					doctorName: '',
					specialty: null,
					specialtyDescription: '',
					featuredImageId: '',
					images: [
						{
							id: 0,
							url: 'assets/images/etc/intakeForms.png',
							type: 'image'
						},
						{
							id: 1,
							url: 'assets/images/etc/sampleFilePreview.jpg',
							type: 'image'
						}
					],
					meansTransport:'',
					patient: 'John Doe',
					priority:'',
					date:new Date(),
					firstAppointment: false,
					includeTravelTime: false,
					caregiverAppointment: false,
					notifications: false,
					name: '',
					categories: [],
					tags: [],
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
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { newProduct } = productSlice.actions;

export default productSlice.reducer;
