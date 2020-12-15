import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import vaccines from './vaccinesSlice';


const reducer = combineReducers({
	profile,
	vaccines
});

export default reducer;
