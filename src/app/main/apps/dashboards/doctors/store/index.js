import { combineReducers } from '@reduxjs/toolkit';
import confirmAppointment from './confirmAppointmentSlice';

const reducer = combineReducers({
	state:confirmAppointment
});

export default reducer;
