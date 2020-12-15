import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const rows = [
	{
		id: 'appointment',
		align: 'left',
		disablePadding: false,
		label: 'Appointment',
		sort: true,
		colspan:2
	},
	{
		id: 'doctorname',
		align: 'left',
		disablePadding: false,
		label: 'Doctor name',
		sort: true
	},
	{
		id: 'patient',
		align: 'left',
		disablePadding: false,
		label: 'Patient',
		sort: true
	},
	{
		id: 'date',
		align: 'left',
		disablePadding: false,
		label: 'Date',
		sort: true
	},
	{
		id: 'priority',
		align: 'left',
		disablePadding: false,
		label: 'Priority',
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

function ProductsTableHead(props) {

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
							colSpan={row.colspan ? row.colspan : 1}
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

export default ProductsTableHead;
