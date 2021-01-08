import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import br from './navigation-i18n/br';


i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('br', 'navigation', br);
i18next.addResourceBundle('ar', 'navigation', ar);


const navigationConfig = [
	{
		id: 'User',
		title: 'Patient',
		translate: 'USER',
		type: 'group',
		auth:['patient'],
		icon: 'pages',
		children: [
			// {
			// 	id: 'dashboard',
			// 	title: 'Dashboard',
			// 	translate: 'Dashboard',
			// 	type: 'item',
				
			// 	icon: 'menu',
			// 	url: '/dashboard'
			// },
				{
					id: 'appointments',
					title: 'My Appointments',
					translate: 'MYAPPOINTMENTS',
					type: 'item',
					icon: 'today',
					url: '/appointments'
				},
				// {
				// 	id: 'treatments',
				// 	title: 'My Treatments',
				// 	translate: 'MYTREATMENTS',
				// 	type: 'item',
				// 	icon: 'healing',
				// 	url: '/treatments'
				// },
				{
					id: 'calendar',
					title: 'Calendar',
					translate: 'CALENDAR',
					type: 'item',
					icon: 'today',
					url: '/apps/calendar'
				},
				{
					id: 'notes',
					title: 'My Diary',
					translate: 'My Diary',
					type: 'item',
					icon: 'note',
					url: '/apps/notes'
				},
				{
					id: 'familymembers',
					title: 'Family Members',
					translate: 'FAMILYMEMBERS',
					type: 'item',
					icon: 'people',
					url: '/family-members'
				},
				{
					id: 'invoices',
					title: 'Invoices',
					translate: 'INVOICES',
					type: 'item',
					icon: 'note',
					url: '/invoices'
				}

			],
		},
	{
		id: 'clinic',
		title: 'CLINIC',
		type: 'group',
		auth:['clinic'],
		icon: 'pages',
		children: [
			// {
			// 	id: 'appointmentBook',
			// 	title: 'Appointment Book',
			// 	type: 'item',
			// 	icon: 'calendar_today',
			// 	url: '/apps/clinic/appointment'
			// },
			{
				id: 'members',
				title: 'My Team',
				type: 'item',
				icon: 'people',
				url: '/apps/clinic/members'
			},
			// {
			// 	id: 'clinics',
			// 	title: 'Clinic',
			// 	translate: 'CLINICBRANCHES',
			// 	type: 'item',
			// 	icon: 'business',
			// 	url: '/apps/clinics/clinics'
			// }
		]
	},
	{
		id: 'provider',
		title: 'PROVIDER',
		type: 'group',
		auth:['provider'],
		icon: 'pages',
		children: [
			{
				id: 'patients',
				title: 'Patients',
				type: 'item',
				icon: 'people',
				url: '/apps/provider/patients'
			},
			{
				id: 'Calendar',
				title: 'Calendar',
				type: 'item',
				icon: 'today',
				url: '/provider/calendar'
			},
			{
				id: 'members',
				title: 'Profile',
				type: 'item',
				icon: 'people',
				url: '/apps/clinic/members/providerProfile'
			},
		]
	},
	{
		id: 'settings',
		title: 'Settings',
		type: 'group',
		auth:['patient'],
		icon: 'pages',
		children: [
			{
				id: 'profile',
				title: 'Profile',
				type: 'item',
				icon: 'person',
				url: '/pages/profile'
			}
		]
	}
];

export default navigationConfig;
