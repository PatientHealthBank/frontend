import { combineReducers } from '@reduxjs/toolkit';
import widgets from '../../../../shared/store/widgetsSlice';

const reducer = combineReducers({
	widgets
});

export default reducer;
