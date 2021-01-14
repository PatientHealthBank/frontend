import React from 'react';

const AdmIntakeFormAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/admin-intake-forms',
			component: React.lazy(() => import('./IntakeForm/IntakeForms.js'))
		},
		{
			path: '/admin-intake-form',
			component: React.lazy(() => import('./IntakeForm/IntakeForm.js'))
		},
		{
			path: '/admin-question/:id?',
			component: React.lazy(() => import('./question/Question.js'))
		},
		{
			path: '/admin-questions/',
			component: React.lazy(() => import('./question/Questions.js'))
		}
	]
};

export default AdmIntakeFormAppConfig;
