import React from 'react';

const DoctorsAppConfig = {
	settings: {
		layout: {
			style: 'layout3',
			config: {}
		}
	},
	routes: [
		{
			path: '/find-doctors/:clinicId',
			component: React.lazy(() => import('./DoctorsApp'))
		}
	]
};

export default DoctorsAppConfig;
