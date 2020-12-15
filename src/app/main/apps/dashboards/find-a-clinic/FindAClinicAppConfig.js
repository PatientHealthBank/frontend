import React from 'react';

const FindAClinicAppConfig = {
	settings: {
		layout: {
			style: 'layout3',
			config: {}
		}
	},
	routes: [
		{
			path: '/find-a-clinic/:specialty/:city?',
			component: React.lazy(() => import('./FindAClinicApp'))
		}
	]
};

export default FindAClinicAppConfig;
