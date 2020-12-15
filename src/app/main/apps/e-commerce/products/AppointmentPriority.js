import _ from '@lodash';
import clsx from 'clsx';
import React from 'react';

export const appointmentPriority = [
	{
		id: 1,
		name: 'Pending',
		color: 'bg-red text-white'
	},
	{
		id: 4,
		name: 'Ready',
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
