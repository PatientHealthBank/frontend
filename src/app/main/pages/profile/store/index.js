import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import vaccines from './vaccinesSlice';
import medicines from './medicinesSlice';
import allergies from './allergiesSlice';
import parameters from './parameterSlice';
import emergencyContact from './emergencyContactSlice';


const reducer = combineReducers({
	allergies,
	profile,
	vaccines,
	medicines,
	parameters,
	emergencyContact

});

export default reducer;
