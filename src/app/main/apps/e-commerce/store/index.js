import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import appointment from './appointmentSlice';
import appointments from './appointmentsSlice';
import appointmentTest from './AppointmentTestSlice';
import invoices from './invoicesSlice';

const reducer = combineReducers({
	appointments,
	appointment,
	appointmentTest,
	orders,
	order,
	invoices
});

export default reducer;
