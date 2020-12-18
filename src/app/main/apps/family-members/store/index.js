import { combineReducers } from '@reduxjs/toolkit';
import familyMembers from './familyMembersSlice';




const reducer = combineReducers({
	familyMembers
});

export default reducer;
