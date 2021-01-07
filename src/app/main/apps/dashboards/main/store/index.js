import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import appointments from './appointmenWidgetSlice'
const reducer = combineReducers({
	widgets,
	appointments,
	projects
});

export default reducer;
