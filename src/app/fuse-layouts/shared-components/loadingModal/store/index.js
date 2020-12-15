import { combineReducers } from '@reduxjs/toolkit';
import loading from './loadingSlice';

const reducer = combineReducers({
	state:loading
});

export default reducer;
