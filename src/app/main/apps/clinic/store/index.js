import { combineReducers } from '@reduxjs/toolkit';
import clinics from './clinicsSlice';
import clinic from './clinicSlice'
import members from './membersSlice';
import member from './memberSlice';

const reducer = combineReducers({
	clinics,
	clinic,
	member,
	members
});

export default reducer;
