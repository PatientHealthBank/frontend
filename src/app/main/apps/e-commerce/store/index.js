import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import product from './productSlice';
import appointments from './appointmentsSlice';

const reducer = combineReducers({
	appointments,
	product,
	orders,
	order
});

export default reducer;
