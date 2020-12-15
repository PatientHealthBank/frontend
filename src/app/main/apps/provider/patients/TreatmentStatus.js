import _ from '@lodash';
import clsx from 'clsx';
import React from 'react';

export const status = [
	{
		id: 1,
		name: 'Under Treatment',
		color: 'bg-orange text-white'
	},
	{
		id: 2,
		name: 'Completed',
		color: 'bg-green text-white'
	},
	{
		id: 3,
		name: 'FirstAppointment',
		color: 'bg-blue text-white'
	}
];

function TreatmentStatus(props) {
	return (
		<div className={clsx('inline text-12 p-4 rounded truncate w-40', _.find(status, { name: props.name }).color)}>
			{props.name}
		</div>
	);
}

export default TreatmentStatus;
