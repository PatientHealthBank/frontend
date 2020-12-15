const ProfileNavigation = {
	id: 'profile',
	title: 'rofile',
	type: 'group',
	icon: 'star',
	children: [
		{
			id: 'profile-overview',
			title: 'Profile Overview',
			type: 'item',
			url: '/pages/profile/profile-overview',
			icon: 'assessment',
		},
		{
			id: 'patient-information',
			title: 'Patient Information',
			type: 'item',
			url: '/pages/profile/patient-information',
			icon: 'account_box',
		},
		{
			id: 'vaccines',
			title: 'Vaccines',
			type: 'item',
			url: '/pages/profile/vaccines',
			icon: 'ballot',
		},
		{
			id: 'medicines',
			title: 'Medicines',
			type: 'item',
			url: '/pages/profile/medicines',
			icon: 'ballot',
		},
		{
			id: 'allergies',
			title: 'Allergies',
			type: 'item',
			url: '/pages/profile/allergies',
			icon: 'ballot',
		},
		{
			id: 'notification-settings',
			title: 'Notification Settings',
			type: 'item',
			url: '/pages/profile/notification-settings',
			icon: 'add_alert',
		},
		{
			id: 'medical-history',
			title: 'Medical History',
			type: 'item',
			url: '/pages/profile/profile-medical-history',
			icon: 'ballot',
		}
	]
};

export default ProfileNavigation;
