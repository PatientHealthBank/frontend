import React from 'react';

const HomeAppConfig = {
	settings: {
		layout: {
			style: 'layout3',
			config: {}
		}
	},
	routes: [
		{
			path: '/Home',
			component: React.lazy(() => import('./Home'))
		}
	]
};

export default HomeAppConfig;
