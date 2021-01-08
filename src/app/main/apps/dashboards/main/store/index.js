import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import appointments from './appointmenWidgetSlice';
import careTeam from './careTeamWidgetSlice';
import appointmentTest from './appointmentTestSlice';
import familyMembers from './FamilyMemberWidgetSlice';

const reducer = combineReducers({
	widgets,
	careTeam,
	appointments,
	appointmentTest,
	familyMembers,
	projects
});

export default reducer;
