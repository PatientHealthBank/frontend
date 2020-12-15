import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import vaccines from './vaccinesSlice';
import medicines from './medicinesSlice';



const reducer = combineReducers({
	profile,
	vaccines,
	medicines
});

export default reducer;
