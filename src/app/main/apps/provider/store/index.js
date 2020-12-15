import { combineReducers } from '@reduxjs/toolkit';
import patients from './patientsSlice';
import patient from './patientSlice';

const reducer = combineReducers({
	patients,
	patient
});

export default reducer;
