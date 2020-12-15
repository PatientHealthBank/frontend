import { combineReducers } from '@reduxjs/toolkit';
import treatments from './treatmentsSlice';
import treatment from './treatmentSlice';

const reducer = combineReducers({
	treatment,
	treatments
});

export default reducer;
