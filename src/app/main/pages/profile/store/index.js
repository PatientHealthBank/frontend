import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import vaccines from './vaccinesSlice';
import medicines from './medicinesSlice';
import allergies from './allergiesSlice';
import parameters from './parameterSlice';




const reducer = combineReducers({
	allergies,
	profile,
	vaccines,
	medicines,
	parameters
});

export default reducer;
