import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPatients} from '../store/patientsSlice';
import PatientsTableHead from './PatientsTableHead';
import TreatmentStatus from './TreatmentStatus';
import { useTranslation } from "react-i18next";
import { lighten, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

function PatientsTable(props) {
	const { t } = useTranslation();
	const useStyles = makeStyles((theme) => ({
		avatarMain: {
			width: theme.spacing(5),
			height: theme.spacing(5),
			marginLeft: '5px'
		},
	}));
	const classes = useStyles();
	// console.log("prop")
	// console.log(props)

	// const dispatch = useDispatch();
	// const patients = useSelector(selectPatients);
	// const searchText = useSelector(({ providerApp }) => providerApp.patients.searchText);

	// const [selected] = useState([]);
	// const [data, setData] = useState(patients);
	// const [page, setPage] = useState(0);
	// const [rowsPerPage, setRowsPerPage] = useState(10);
	// const [order, setOrder] = useState({
	// 	direction: 'asc',
	// 	id: null
	// });

	// useEffect(() => {
	// 	dispatch(getPatients());
	// }, [dispatch]);

	// useEffect(() => {
	// 	if (searchText.length !== 0) {
	// 		setData(_.filter(patients, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
	// 		setPage(0);
	// 	} else {
	// 		setData(patients);
	// 	}
	// }, [patients, searchText]);

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

	function handleClick(item) {
		props.history.push(`/apps/provider/patients/${item.id}`);
	}

	// function handleChangePage(event, value) {
	// 	setPage(value);
	// }

	// function handleChangeRowsPerPage(event) {
	// 	setRowsPerPage(event.target.value);
	// }
	const columns = [	{
		id: 'image',
		align: 'left',
		disablePadding: true,
		label: '',
		sort: false
	},
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'birthDate',
		align: 'left',
		disablePadding: false,
		label: 'Age',
		sort: true
	},
	{
		id: 'contactPhone',
		align: 'left',
		disablePadding: false,
		label: 'Contact Phone',
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
		id: 'onTreatement',
		align: 'left',
		disablePadding: false,
		label: 'Treatment',
		sort: true
	},
	{
		id: 'lastAppoinemt',
		align: 'left',
		disablePadding: false,
		label: 'Last Appointment',
		sort: true
	}
];
	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
					{/* <PatientsTableHead
						numSelected={selected.length}
						order={order}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
					/> */}
					<TableHead>
						<TableRow >
							{columns.map((column, i) => (
								<TableCell key={i} className="h3 px-12 font-bold" colSpan={column.colspan ? column.colspan : 1}>
									{t(column.label)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{
							/* {_.orderBy(
								data,
								[
									o => {
										switch (order.id) {
											case 'categories': {
												return o.categories[0];
											}
											default: {
												return o[order.id];
											}
										}
									}
								],
								[order.direction]
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) }*/
							props.patients.map(n => {
								// const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
									className="h-64 cursor-pointer"
									hover
									role="checkbox"
									// aria-checked={isSelected}
									// tabIndex={-1}
									// key={n.id}
									// selected={isSelected}
									>
										<TableCell
											className="w-52 px-16 md:px-0"
											component="th"
											scope="row"
											padding="none"
											onClick={event => handleClick(n)}
										>
											{n.imageUrl == null && n.imageUrl == "" ? (
												<Avatar className="md:mx-4" alt="user photo" src={n.imageUrl} />
											) : (
													<Avatar className={classes.avatarMain} >{n.name[0]}</Avatar>
												)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.name}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{moment().diff(new Date(n.birthdate), 'years',false)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.phone}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.email}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{/* <TreatmentStatus name={n.onTreatement} /> */}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{new Date(n.lastAppointment).toLocaleString()}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
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

export default withRouter(PatientsTable);
