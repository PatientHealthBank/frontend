import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";
import React from 'react';
import AppointmentPriority from './AppointmentPriority';
import AppointmentDialog from './AppointmentDialog';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

function AppointmentsTable(props) {

	const { t } = useTranslation();
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();
	const [invoice, setInvoice] = React.useState(false);
	const [title, setTitle] = React.useState(false);
	const [appointmentId, setAppointmentId] = React.useState(false);
	const [currentFile, setCurrentFile] = React.useState(false);


	const handleOpenModal = (row) => {	
		setOpen(true);
		var stop = 0;
		props.invoices.map(function(value, i) {

			if(value.appointmentId == row.id && stop == 0){
				setInvoice(value);
				setTitle('Edit');
				setAppointmentId('');
				setCurrentFile(value.fileUrl);
				stop++;
			}
		});

		if(stop == 0){
			setInvoice({});
			setTitle('New');
			setAppointmentId(row.id);
			setCurrentFile();
		}
		
	}			

	const setDisplay = (param) => {	
		return {display: param};
	}

	// function handleChangePage(event, value) {
	// 	setPage(value);
	// }

	// function handleChangeRowsPerPage(event) {
	// 	setRowsPerPage(event.target.value);
	// }
	const columns = [
		{
			id: 'appointment',
			title: 'Appointment',
		},
		{
			id: 'doctorname',
			title: 'Doctor name',
		},
		{
			id: 'patient',
			title: 'Patient',
		},
		{
			id: 'date',
			title: 'Date',
		},
		{
			id: 'priority',
			title: 'Tasks',
		},
		{
			id: 'actions',
			title: 'Actions',
		}
	];
	return (
		<div className={classes.root}>
		
		<Paper className="w-full rounded-8 shadow-1">
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table className="min-w-xl" aria-labelledby="tableTitle">
						<TableHead>
							<TableRow >
								{columns.map((column,i) => (
									<TableCell key={i} className="h3 px-12 font-bold">
										{t(column.title)}
									</TableCell>
								))}
							</TableRow>

						</TableHead>

						<TableBody>
							{props.appointments.map((row,i) =>
								<TableRow key={i}>
									<TableCell className="p-4 md:p-16" component="th" scope="row" >
										{/* { row.images.length > 0 && row.featuredImageId ? (
									<Avatar className="mx-4" alt={row.name} src={row.featuredImageId} />		
											) : (
												<img
													className="w-full block rounded"
													src="assets/images/ecommerce/product-image-placeholder.png"
													alt={row.name}
												/>
											)} */}
										{t(row.specialty.description)}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" >
										{t(row.provider.name)}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" >
										{t(row.patient.name)}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" >
										{new Date(row.createDate).toLocaleString()}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" >
										<AppointmentPriority name={"Ready"} />
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" >

									<IconButton title="invoice" style={setDisplay(row)} onClick={() => handleOpenModal(row)} aria-label="delete">
										<Icon>note</Icon>
									</IconButton>
										{
											// <CheckIn specialty={n.specialtyDescription} date={n.date} disabled={n.priority === "Pending"}/>
										}
									</TableCell>

									
								</TableRow>
								
							)}
						</TableBody>
						<AppointmentDialog open={open} setOpen={setOpen}
							member={invoice}
							handleEdit={props.UpdateInvoices}
							handleAdd={props.RegisterNewInvoices}
							setMember={setInvoice}
							title={title}
							appointmentId={appointmentId}
							currentFile={currentFile}
						/>
					</Table>
				</FuseScrollbars>
				{/* <TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/> */}
			</div>
		</Paper>
		</div>
	);
}

export default withRouter(AppointmentsTable);
