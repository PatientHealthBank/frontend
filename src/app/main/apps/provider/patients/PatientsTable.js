import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPatients, selectPatients } from '../store/patientsSlice';
import PatientsTableHead from './PatientsTableHead';
import TreatmentStatus from './TreatmentStatus';

function PatientsTable(props) {
	const dispatch = useDispatch();
	const patients = useSelector(selectPatients);
	const searchText = useSelector(({ providerApp }) => providerApp.patients.searchText);

	const [selected] = useState([]);
	const [data, setData] = useState(patients);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getPatients());
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(patients, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(patients);
		}
	}, [patients, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleClick(item) {
		props.history.push(`/apps/provider/patients/${item.id}`);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table className="min-w-xl" aria-labelledby="tableTitle">
					<PatientsTableHead
						numSelected={selected.length}
						order={order}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
					/>

					<TableBody>
						{_.orderBy(
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
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}

									>
										<TableCell
											className="w-52 px-16 md:px-0"
											component="th"
											scope="row"
											padding="none"
											onClick={event => handleClick(n)}
										>
											{n.images.length > 0 && n.featuredImageId ? (
												<Avatar className="mx-4" alt={n.name} src={n.featuredImageId} />
											) : (
													<img
														className="w-full block rounded"
														src="assets/images/ecommerce/patient-image-placeholder.png"
														alt={n.name}
													/>
												)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.name}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.birthday}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.contactPhone}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.email}
										</TableCell>


										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											<TreatmentStatus name={n.onTreatement} />
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.lastAppoinemt}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
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
			/>
		</div>
	);
}

export default withRouter(PatientsTable);
