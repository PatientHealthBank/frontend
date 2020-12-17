import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import vaccines from './vaccinesSlice';
import medicines from './medicinesSlice';
import allergies from './allergiesSlice';
import emergencyContact from './emergencyContactSlice';

const reducer = combineReducers({
	allergies,
	profile,
	vaccines,
	medicines,
	emergencyContact
});

export default reducer;
