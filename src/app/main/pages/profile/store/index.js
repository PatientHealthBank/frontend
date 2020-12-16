import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import vaccines from './vaccinesSlice';
import medicines from './medicinesSlice';
import allergies from './allergiesSlice';




const reducer = combineReducers({
	allergies,
	profile,
	vaccines,
	medicines
});

export default reducer;
