import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';

function VaccinesListWidget(props) {
	return (
		<Paper className="w-full rounded-8 shadow-1">
			<div className="flex items-center justify-between px-16 h-64 border-b-1">
				<Typography className="text-22 font-bold">{props.widget.title}</Typography>
			</div>
			<div className="table-responsive">
				<Table className="w-full min-w-full">
					<TableHead>
						<TableRow>
							{props.widget.table.columns.map(column => (
								<TableCell key={column.id} className="whitespace-no-wrap">
									{t(column.title)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{props.widget.table.rows.map(row => (
							<TableRow key={row.id}>
								{row.cells.map(cell => {
									switch (cell.id) {
										case 'action': {
											return (
												<TableCell key={cell.id} component="th" scope="row">
													<Typography
														className={clsx(
															cell.classes,
															'inline text-11 font-500 px-8 py-4 rounded-4'
														)}
													>
														{t(cell.value)}
													</Typography>
												</TableCell>
											);
										}
										case 'spent_perc': {
											return (
												<TableCell key={cell.id} component="th" scope="row">
													<Typography className={clsx(cell.classes, 'flex items-center')}>
														{t(cell.value)}
														<Icon className="text-14 mx-4">{cell.icon}</Icon>
													</Typography>
												</TableCell>
											);
										}
										default: {
											return (
												<TableCell key={cell.id} component="th" scope="row">
													<Typography className={cell.classes}>
														{t(cell.value)}
													</Typography>
												</TableCell>
											);
										}
									}
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default React.memo(VaccinesListWidget);
