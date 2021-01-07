import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import appointments from './appointmenWidgetSlice';
import careTeam from './careTeamSlice';
import appointmentTest from './appointmentTestSlice'
const reducer = combineReducers({
	widgets,
	careTeam,
	appointments,
	appointmentTest,
	projects
});

export default reducer;
