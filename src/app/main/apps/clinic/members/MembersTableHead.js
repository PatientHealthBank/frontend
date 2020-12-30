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
		sort: true,
		colspan: 2
	},
	{
		id: 'specialty',
		align: 'left',
		disablePadding: false,
		label: 'Specialty',
		sort: true,
		colspan: 2
	},
	{
		id: 'clinicalinterest',
		align: 'left',
		disablePadding: false,
		label: 'Clinical Interest',
		sort: true
	},
	{
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'E-mail',
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


function MembersTableHead(props) {

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};


	return (
		<TableHead>
			<TableRow className="h-72">
				{rows.map(row => {
					return (
						<TableCell
							className="p-8 md:p-16"
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

export default MembersTableHead;
