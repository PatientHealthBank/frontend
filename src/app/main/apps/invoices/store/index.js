import { combineReducers } from '@reduxjs/toolkit';
import invoices from './invoicesSlice';




const reducer = combineReducers({
	invoices
});

export default reducer;
