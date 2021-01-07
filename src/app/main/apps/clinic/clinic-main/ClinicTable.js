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
import { getClinics, selectClinics, deleteClinic } from '../store/clinicsSlice';
import ClinicBranchsTableHead from './ClinicTableHead';
import { useForm, useDeepCompareEffect, useDebounce } from '@fuse/hooks';

function ClinicTable(props) {
	const dispatch = useDispatch();
	const clinic = useSelector(selectClinics);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(clinic);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		setData(clinic);
	}, [dispatch, clinic]);

	useDeepCompareEffect(() => {
		dispatch(getClinics());
	}, [dispatch]);

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

	function handleDelete(id, e) {
		console.log('handle delete', id);
		dispatch(deleteClinic(id));
	}
	function handleClick(item) {
		console.log('handle click');
		props.history.push(`/apps/clinic-main/${item.id}`);
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
									>
										<TableCell
											className="p-4 md:p-16"
											onClick={event => handleClick(n)}
											component="th"
											scope="row"
										>
											{n.companyName}
										</TableCell>

										<TableCell
											className="p-4 md:p-16"
											onClick={event => handleClick(n)}
											component="th"
											scope="row"
										>
											{n.address.addressLine1}
										</TableCell>

										<TableCell
											className="p-4 md:p-16"
											onClick={event => handleClick(n)}
											component="th"
											scope="row"
										>
											{n.address.city}
										</TableCell>

										<TableCell
											className="p-4 md:p-16"
											onClick={event => handleClick(n)}
											component="th"
											scope="row"
										>
											{n.address.state}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											<button onClick={e => handleDelete(n.id, e)}>Remove</button>
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
