import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';

import { useTranslation } from "react-i18next";

function MedicinesListWidget(props) {
	const { t } = useTranslation();
	const handleDelete = (id)=> {
		props.deleteMedicines(id);
	}
	const columns = [
		{
			id: 'Name',
			title: 'Name'
		},
		{
			id: 'Dosage',
			title: 'Dosage'
		},
		{
			id: 'Frequency',
			title: 'Frequency'
		},
		{
			id: 'Refill Status',
			title: 'Refill Status'
		}
	];
	return (
		<Paper className="w-full rounded-8 shadow-1">
			<div className="flex items-center justify-between px-16 h-64 border-b-1">
				<Typography className="text-22 font-bold">Medicines</Typography>
			</div>
			<div className="table-responsive">
				<Table className="w-full min-w-full">
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell key={column.id} className="whitespace-no-wrap">
									{column.title}
								</TableCell>
							))}
								<TableCell className="whitespace-no-wrap">
									Actions
								</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.medicines.map(cell =>(
							<TableRow key={cell.id}>
								<TableCell component="th" scope="row">
									<Typography className={cell.classes}>{cell.name}</Typography>
								</TableCell>
								<TableCell component="th" scope="row">
									<Typography className={cell.classes}>{cell.dosage}</Typography>
								</TableCell>
								<TableCell  component="th" scope="row">
									<Typography className={cell.classes}>{cell.frequency}</Typography>
								</TableCell>
								<TableCell component="th" scope="row">
									<Typography className={cell.classes}>{cell.refillStatus ? "Yes" : "No"}</Typography>
								</TableCell>
								<TableCell component="th" scope="row">
										<IconButton aria-label="delete" onClick={()=>handleDelete(cell.id)}>
											<Icon>{t('delete')}</Icon>
										</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default React.memo(MedicinesListWidget);
