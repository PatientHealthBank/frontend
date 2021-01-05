import React from 'react';

const DashboardAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/dashboard',
			component: React.lazy(() => import('./DashboardApp'))
		},
	]
};

export default DashboardAppConfig;
