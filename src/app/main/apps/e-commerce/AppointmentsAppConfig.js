import React from 'react';
import { Redirect } from 'react-router-dom';

const AppointmentsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/appointment/:productId',
			component: React.lazy(() => import('./appointment/Appointment'))
		},
		{
			path: '/appointments',
			component: React.lazy(() => import('./appointments/Appointments'))
		},
		{
			path: '/intake-form',
			component: React.lazy(() => import('./intake-forms/IntakeForm'))
		},
		{
			path: '/apps/e-commerce/orders/:orderId',
			component: React.lazy(() => import('./order/Order'))
		},
		{
			path: '/apps/e-commerce/orders',
			component: React.lazy(() => import('./orders/Orders'))
		},
		{
			path: '/apps/e-commerce',
			component: () => <Redirect to="/apps/e-commerce/appointments" />
		}
	]
};

export default AppointmentsAppConfig;
