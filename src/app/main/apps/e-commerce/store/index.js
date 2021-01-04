import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import product from './productSlice';
import appointments from './appointmentsSlice';
import invoices from './invoicesSlice';

const reducer = combineReducers({
	appointments,
	product,
	orders,
	order
});

export default reducer;
