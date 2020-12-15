import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function MedicinesWidget(props) {
	return (
		<Card className="w-full rounded-8 shadow-1">
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">My Medications</Typography>

				<div>
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				</div>
			</div>

			<table className="simple clickable">
				<thead>
					<tr>
						<th className="text-right">Name</th>
						<th className="text-right">Dosage</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map(row => (
						<tr key={row.id}>
							<td className="text-right">{row.description}</td>
							<td className="text-right">{row.quantity}</td>
						</tr>
					))}
				</tbody>
			</table>

			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default React.memo(MedicinesWidget);
