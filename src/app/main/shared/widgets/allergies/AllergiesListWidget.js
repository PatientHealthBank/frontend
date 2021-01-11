import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from "react-i18next";

function AllergiesListWidget(props) {
	const { t } = useTranslation();
	const handleDelete = (id)=> {
		props.deleteAllergies(id);
	}
	const columns= [
		{
			id: 'allergicTo',
			title: 'Allergic to'
		},
		{
			id: 'AgeOfOnset',
			title: 'Age of Onset'
		},
		{
			id: 'type',
			title: 'Type'
		},
		{
			id: 'severity',
			title: 'Severity'
		},
		{
			id: 'actions',
			title: 'Actions'
		}
	];
	
	return (
		<Paper className="w-full rounded-8 shadow-1">	
			<div className="p-4 px-4 flex flex-row items-center justify-between">
				<Typography className="h3 px-12 font-bold">{t('Allergies')}</Typography>
			</div>
			<div className="table-responsive">
				<Table className="w-full min-w-full">
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell key={column.id} className="whitespace-no-wrap">
									{t(column.title)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{props.allergies.map(row =>
							<TableRow key={row.id}>
								<TableCell component="th" scope="row">
									<Typography
										className={clsx(
											row.classes,
											'inline text-11 font-500 px-8 py-4 rounded-4'
										)}
									>
										{t(row.allergicTo)}
									</Typography>
								</TableCell>
								<TableCell component="th" scope="row">
									<Typography
										className={clsx(
											row.classes,
											'inline text-11 font-500 px-8 py-4 rounded-4'
										)}
									>
										{t(row.ageOfOnset)}
									</Typography>
								</TableCell>
								<TableCell component="th" scope="row">
									<Typography
										className={clsx(
											row.classes,
											'inline text-11 font-500 px-8 py-4 rounded-4'
										)}
									>
										{t(row.type)}
									</Typography>
								</TableCell>
								<TableCell component="th" scope="row">
									<Typography
										className={clsx(
											row.classes,
											'inline text-11 font-500 px-8 py-4 rounded-4'
										)}
									>
										{t(row.severity)}
									</Typography>
								</TableCell>
								<TableCell component="th" scope="row">
									<Typography
										className={clsx(
											row.classes,
											'inline text-11 font-500 px-8 py-4 rounded-4'
										)}
									>
										<IconButton aria-label="delete" onClick={()=>handleDelete(row.id)}>
											<Icon>{t('delete')}</Icon>
										</IconButton>
									</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</Paper>
	);
}

export default React.memo(AllergiesListWidget);
