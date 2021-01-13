import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsWidgetSlice';
import widgets from './widgetsSlice';
import appointments from './appointmenWidgetSlice';
import careTeam from './careTeamWidgetSlice';
import appointmentTest from './appointmentTestSlice';
import familyMembers from './FamilyMemberWidgetSlice';
import medicalHistory from './medicalHistorySlice';
const reducer = combineReducers({
	widgets,
	careTeam,
	appointments,
	appointmentTest,
	familyMembers,
	medicalHistory,
	projects
});

export default reducer;
