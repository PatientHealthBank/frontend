import { combineReducers } from '@reduxjs/toolkit';
import clinic from './clinicSlice';
import members from './membersSlice';
import member from './memberSlice';

const reducer = combineReducers({
	clinic,
	member,
	members
});

export default reducer;
