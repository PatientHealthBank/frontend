import React from 'react';

const FamilyMembersAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/family-members',
			component: React.lazy(() => import('./FamilyMembers'))
		},
	]
};

export default FamilyMembersAppConfig;
