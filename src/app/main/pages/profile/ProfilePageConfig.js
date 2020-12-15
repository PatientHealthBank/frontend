import React from 'react';
import { Redirect } from 'react-router-dom';

const ProfilePageConfig = {
	routes: [
		{
			path: '/pages/profile',
			component: React.lazy(() => import('./ProfilePageLayout')),
			routes: [
				{
					path: '/pages/profile/profile-overview',
					component: React.lazy(() => import('./ProfileOverview'))
				},
				{
					path: '/pages/profile/vaccines',
					component: React.lazy(() => import('./Vaccines'))
				},
				{
					path: '/pages/profile/medicines',
					component: React.lazy(() => import('./Medicines'))
				},
				{
					path: '/pages/profile/allergies',
					component: React.lazy(() => import('./Allergies'))
				},
				{
					path: '/pages/profile/notification-settings',
					component: React.lazy(() => import('./NotificationSettings'))
				},
				{
					path: '/pages/profile/patient-information',
					component: React.lazy(() => import('./PatientInformation'))
				},
				{
					path: '/pages/profile/profile-strength',
					component: React.lazy(() => import('./ProfileStrength'))
				},
				{
					path: '/pages/profile/profile-medical-history',
					component: React.lazy(() => import('./ProfileMedicalHistory'))
				},
				{
					path: '/pages/profile',
					component: () => <Redirect to="/pages/profile/profile-overview" />
				}
			]
		}
	]
};

export default ProfilePageConfig;
