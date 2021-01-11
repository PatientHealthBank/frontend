import React from 'react';

const AdmIntakeFormAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/admin-intake-form',
			component: React.lazy(() => import('./AdmIntakeForm.js'))
		},
		{
			path: '/admin-question',
			component: React.lazy(() => import('./question/Question.js'))
		}
	]
};

export default AdmIntakeFormAppConfig;
