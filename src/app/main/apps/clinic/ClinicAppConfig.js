import React from 'react';
import Member from './member/Member';
const ClinicAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/clinic/appointment',
			component: React.lazy(() => import('./appointment/AppointmentBook'))
		},
		{
			path: '/apps/clinic-main/:clinicId',
			component: React.lazy(() => import('./clinic/Clinic'))
		},
		{
			path: '/apps/clinic-main',
			component: React.lazy(() => import('./clinic-main/Clinic'))
		},
		{
			path: '/apps/clinic/members/:membersId',
			component: Member
		},
		{
			path: '/apps/clinic/members',
			component: React.lazy(() => import('./members/Members'))
		},
	]
};

export default ClinicAppConfig;
