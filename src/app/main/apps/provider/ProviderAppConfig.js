import React from 'react';

const ProviderAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/provider/patients/:patientId',
			component: React.lazy(() => import('./patient/Patient'))
		},
		{
			path: '/apps/provider/patients',
			component: React.lazy(() => import('./patients/Patients'))
		}
	]
};

export default ProviderAppConfig;
