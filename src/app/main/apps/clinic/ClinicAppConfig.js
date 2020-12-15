import React from 'react';

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
			path: '/apps/clinic/clinicbranchs/:clinicId',
			component: React.lazy(() => import('./clinic-branch/ClinicBranch'))
		},
		{
			path: '/apps/clinic/clinicbranchs',
			component: React.lazy(() => import('./clinic-branchs/ClinicBranchs'))
		},
		{
			path: '/apps/clinic/members/:membersId',
			component: React.lazy(() => import('./member/Member'))
		},
		{
			path: '/apps/clinic/members',
			component: React.lazy(() => import('./members/Members'))
		},		
	]
};

export default ClinicAppConfig;
