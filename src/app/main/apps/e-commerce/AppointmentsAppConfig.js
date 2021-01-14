import React from 'react';
import { Redirect } from 'react-router-dom';
import Appointment from './appointment/Appointment'
const AppointmentsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/appointment/:appointmentId',
			component: Appointment
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
			path: '/apps/e-commerce',
			component: () => <Redirect to="/apps/e-commerce/appointments" />
		}
	]
};

export default AppointmentsAppConfig;
