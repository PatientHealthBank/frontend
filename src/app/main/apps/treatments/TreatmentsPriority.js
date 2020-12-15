import _ from '@lodash';
import clsx from 'clsx';
import React from 'react';

export const appointmentPriority = [
	{
		id: 1,
		name: 'High',
		color: 'bg-red text-white'
	},
	{
		id: 2,
		name: 'Normal',
		color: 'bg-green text-white'
	},
	{
		id: 3,
		name: 'Low',
		color: 'bg-orange text-black'
	},
	{
		id: 4,
		name: 'Check-in',
		color: 'bg-blue text-white'
	}
];

function OrdersStatus(props) {
	return (
		<div className={clsx('inline text-12 p-4 rounded truncate', _.find(appointmentPriority, { name: props.name }).color)}>
			{props.name}
		</div>
	);
}

export default OrdersStatus;
