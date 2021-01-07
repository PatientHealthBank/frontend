import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import appointments from './appointmenWidgetSlice';
import careTeam from './careTeamSlice';
const reducer = combineReducers({
	widgets,
	careTeam,
	appointments,
	projects
});

export default reducer;
