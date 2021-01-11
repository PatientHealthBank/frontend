import React from 'react';
import Invoices from './Invoices'; 

const InvoicesAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/invoices',
			component: Invoices
		},
	]
};

export default InvoicesAppConfig;
