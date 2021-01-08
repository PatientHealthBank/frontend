import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import appointments from './appointmenWidgetSlice';
import careTeam from './careTeamSlice';
import appointmentTest from './appointmentTestSlice'
import medicalHistory from './medicalHistorySlice'
const reducer = combineReducers({
	widgets,
	careTeam,
	appointments,
	appointmentTest,
	medicalHistory,
	projects
});

export default reducer;
