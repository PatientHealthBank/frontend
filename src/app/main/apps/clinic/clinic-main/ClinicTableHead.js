import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const rows = [
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'address',
		align: 'left',
		disablePadding: false,
		label: 'Address',
		sort: true
	},
	{
		id: 'city',
		align: 'left',
		disablePadding: false,
		label: 'City',
		sort: true
	},
	{
		id: 'state',
		align: 'left',
		disablePadding: false,
		label: 'State',
		sort: true
	},
	{
		id: 'actions',
		align: 'left',
		disablePadding: false,
		label: 'Actions',
		sort: true
	}
];

function ClinicTableHead(props) {

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};


	return (
		<TableHead>
			<TableRow className="h-64">
				{rows.map(row => {
					return (
						<TableCell
							className="p-4 md:p-16"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default ClinicTableHead;
