import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import appointment from './appointmentSlice';
import appointments from './appointmentsSlice';

const reducer = combineReducers({
	appointments,
	appointment,
	orders,
	order
});

export default reducer;
