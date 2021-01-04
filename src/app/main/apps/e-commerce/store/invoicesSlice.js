import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const invoicesList = () => async (dispatch, getState) => {
    dispatch(openLoading());
	var user = getState().auth.user;
	
	return phbApi().get('/Invoices/list/'+user.uuid)
		.then(({data}) => {
			dispatch(closeLoading())
			return dispatch(getInvoicesList(data));
		})
		.catch(error => {
            return dispatch(closeLoading())
		});
};

const InvoicesAdapter = createEntityAdapter({});

export const { selectAll: selectInvoices, selectById: selectInvoicesById } = InvoicesAdapter.getSelectors(
	state => state.profile.Invoices
);

const invoicesSlice = createSlice({
	name: 'apps/Invoices',
	initialState: [],
	reducers: {
        getInvoicesList:{reducer: (state, action) => {
            return action.payload;
        }}
	}
});

export const { getInvoicesList } = invoicesSlice.actions;

export default invoicesSlice.reducer;
