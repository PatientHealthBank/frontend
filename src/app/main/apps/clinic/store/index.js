import { combineReducers } from '@reduxjs/toolkit';
import clinicBranchs from './clinicBranchsSlice';
import clinicBranch from './clinicBranchSlice';
import members from './membersSlice';
import member from './memberSlice';

const reducer = combineReducers({
	clinicBranch,
	clinicBranchs,
	member,
	members
});

export default reducer;
