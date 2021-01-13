import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAppointments, selectAppointments } from '../store/appointmentsSlice';
import AppointmentsTableHead from './AppointmentsTableHead';
import AppointmentPriority from './AppointmentPriority';
import { useTranslation } from "react-i18next";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppointmentDialog from './AppointmentDialog';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';



function AppointmentTable(props) {
	const { t } = useTranslation();

	const [open, setOpen] = React.useState(false);
	const [invoice, setInvoice] = React.useState(false);
	const [title, setTitle] = React.useState(false);
	const [appointmentId, setAppointmentId] = React.useState(false);
	const [currentFile, setCurrentFile] = React.useState(false);
	const useStyles = makeStyles((theme) => ({
		avatarMain: {
			width: theme.spacing(5),
			height: theme.spacing(5),
			marginLeft: '5px'
		},
	}));
	const classes = useStyles();

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

	// const dispatch = useDispatch();
	// const appointments = useSelector(selectAppointments);
	// const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.appointments.searchText);

	// const [selected, setSelected] = useState([]);
	// const [data, setData] = useState(appointments);
	// const [page, setPage] = useState(0);
	// const [rowsPerPage, setRowsPerPage] = useState(10);
	// const [order, setOrder] = useState({
	// 	direction: 'asc',
	// 	id: null
	// });

	// useEffect(() => {
	// 	dispatch(getAppointments());
	// }, [dispatch]);

	// useEffect(() => {
	// 	if (searchText.length !== 0) {
	// 		setData(_.filter(appointments, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
	// 		setPage(0);
	// 	} else {
	// 		setData(appointments);
	// 	}
	// }, [appointments, searchText]);

	// function handleRequestSort(event, property) {
	// 	const id = property;
	// 	let direction = 'desc';

	// 	if (order.id === property && order.direction === 'desc') {
	// 		direction = 'asc';
	// 	}

	// 	setOrder({
	// 		direction,
	// 		id
	// 	});
	// }

	// function handleSelectAllClick(event) {
	// 	if (event.target.checked) {
	// 		setSelected(data.map(n => n.id));
	// 		return;
	// 	}
	// 	setSelected([]);
	// }

	function handleClick(item) {
		props.history.push(`/appointment/${item.id}/`);
	}

	// function handleChangePage(event, value) {
	// 	setPage(value);
	// }

	// function handleChangeRowsPerPage(event) {
	// 	setRowsPerPage(event.target.value);
	// }
	const columns = [
		{
			id: 'doctorname',
			title: 'Doctor name',
			colspan: 2,
		},
		{
			id: 'appointment',
			title: 'Appointment',
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
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
					<TableHead>
						<TableRow >
							{columns.map((column, i) => (
								<TableCell key={i} className="h3 px-12 font-bold" colSpan={column.colspan ? column.colspan : 1}>
									{t(column.title)}
								</TableCell>
							))}
						</TableRow>

					</TableHead>
					{/* <AppointmentsTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
					/> */}

					<TableBody>
						{props.appointments
							// .orderBy(
							// 	data,
							// 	[
							// 		o => {
							// 			switch (order.id) {
							// 				case 'categories': {
							// 					return o.categories[0];
							// 				}
							// 				default: {
							// 					return o[order.id];
							// 				}
							// 			}
							// 		}
							// 	],
							// 	[order.direction]
							// )
							// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, i) => {
								// const isSelected = selected.indexOf(i) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
									// aria-checked={isSelected}
									// tabIndex={-1}
									// key={i}
									// selected={isSelected}

									>
										<TableCell
											className="w-52 px-16 md:px-0"
											component="th"
											scope="row"
											padding="none"
											onClick={event => handleClick(row)}
										>
											{row.provider.imageUrl == null && row.provider.imageUrl == ""?(
												<Avatar className="md:mx-4" alt="user photo" src={row.provider.imageUrl} />
											) : (
													<Avatar className={classes.avatarMain} >{row.provider.name[0]}</Avatar>
												)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(row)}>
											{t(row.provider.name)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(row)}>
											{t(row.specialty.description)}
											{row.telemedicine &&
												<Icon title="Appointment Telemedicine" style={{ marginLeft: '10px', marginTop: '20px', display: "inline-flex", color: 'green' }}>camera_alt</Icon>
											}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(row)}>
											{t(row.patient.name)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(row)}>
										<Moment date={row.createDate}/>
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(row)}>
											{/* <AppointmentPriority name={n.priority} /> */}
											<AppointmentPriority name={"Ready"} />
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
										<IconButton title="invoice" style={setDisplay(row)} onClick={() => handleOpenModal(row)} aria-label="delete">
											<Icon>note</Icon>
										</IconButton>
											{/* <CheckIn specialty={n.specialtyDescription} date={n.date} disabled={n.priority === "Pending"}/> */}
										</TableCell>
									</TableRow>
								);
							})}
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
	);
}

export default withRouter(AppointmentTable);
