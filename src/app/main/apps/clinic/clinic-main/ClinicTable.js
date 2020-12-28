import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getClinic, selectClinic } from '../store/clinicSlice';
import ClinicBranchsTableHead from './ClinicTableHead';

function ClinicTable(props) {
	const dispatch = useDispatch();
	const clinic = useSelector(selectClinic);
	const searchText = useSelector(({ ClinicApp }) => ClinicApp.clinic.searchText);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(clinic);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getClinic());
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(clinic, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(clinic);
		}
	}, [clinic, searchText]);

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

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push(`/apps/clinic/clinicBranchs/${item.id}`);
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
					<ClinicBranchsTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
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
										onClick={event => handleClick(n)}
									>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.companyName }
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.addressLine1}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.city}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.state}
										</TableCell>
										
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.actions}
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

export default withRouter(ClinicTable);
