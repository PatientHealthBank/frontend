import React from 'react';

const TreatmentsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/treatments/:treatmentId',
			component: React.lazy(() => import('./Treatment'))
		},
		{
			path: '/treatments',
			component: React.lazy(() => import('./Treatments'))
		},
	]
};

export default TreatmentsAppConfig;
