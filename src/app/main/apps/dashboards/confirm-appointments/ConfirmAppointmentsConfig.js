import React from 'react';

const ConfirmAppointmentsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/confirm-appointment/',
			component: React.lazy(() => import('./DoctorsApp'))
		},
	]
};

export default ConfirmAppointmentsConfig;
