import React from 'react';
import FamilyMembers from './FamilyMembers';

const FamilyMembersAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/family-members',
			component: FamilyMembers
		},
	]
};

export default FamilyMembersAppConfig;
