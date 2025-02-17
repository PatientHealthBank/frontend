import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import MemberDialog from './MemberDialog'
import PrimaryIconButton from '../../Components/PrimaryIconButton'
import Icon from '@material-ui/core/Icon';

function createData(name, address, phone, relationship, dateofBirth) {
	return { name, address, phone, relationship, dateofBirth };
}

const rowsBody = [
	createData('Lillian M Collins', "2371  Arron Smith Drive - California", "843-785-0439", "Child", "02/10/1996"),
	createData('Paulette T Welch', "2371  Arron Smith Drive - California", "883-235-2439","Other", "01/21/1990"),
	createData('Morgana Clever', "2371  Arron Smith Drive - California", "419-275-8773", "Spouse" ,"12/07/1978"),
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Name' },
	{ id: 'address', numeric: false, disablePadding: false, label: 'Address' },
	{ id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
	{ id: 'relationship', numeric: false, disablePadding: false, label: 'Relationship' },
	{ id: 'dateofBirth', numeric: false, disablePadding: false, label: 'Date of Birth' },
];

function EnhancedTableHead(props) {
	const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	title: {
		flex: '1 1 100%',
	},
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
			) : (
					<Typography className={classes.title} variant="h6" id="tableTitle" component="div">

					</Typography>
				)}

			{numSelected > 0 ? (
				<>
					{ numSelected === 1 && (<Tooltip title="Edit">
						<IconButton onClick={() => props.handleOpenModal("Edit")} aria-label="delete">
							<Icon>edit</Icon>
						</IconButton>
					</Tooltip>)}
					<Tooltip title="Delete">
						<IconButton onClick={props.handleDelete} aria-label="delete">
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</>
			) : (
					<Tooltip title="Add Member">
						<PrimaryIconButton onClick={() => props.handleOpenModal("New")} >
							<Icon>add</Icon>
						</PrimaryIconButton>
					</Tooltip>
				)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

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

function FamilyMembersTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState();
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [rows, setRows] = React.useState(rowsBody);
	const [selectedRow, setSelectedRow] = React.useState({});


	const handleDelete = () => {
		setRows(rows.filter((x,i) => !selected.includes(i)))
		setSelected([]);
	}
	const handleAdd = (row) => {
		setRows([...rows, row])
		setSelectedRow({})
	}
	const handleEdit = (row) => {
		var newRows = rows.map((x,i) => {
			if (i === selected[0]) {
				return row
			}
			else {
				return x
			}
		})
		setRows(newRows)
		setSelected([]);
		setSelectedRow({})
	}

	const handleOpenModal = (titleModal) => {
		setTitle(titleModal)
		if (titleModal === "Edit") {
			setSelectedRow(rows.find((x,i) => selected.includes(i)))
		}			
			setOpen(true)
	}

		const handleRequestSort = (event, property) => {
			const isAsc = orderBy === property && order === 'asc';
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(property);
		};

		const handleSelectAllClick = (event) => {
			if (event.target.checked) {
				const newSelecteds = rows.map((n,i) => i);
				setSelected(newSelecteds);
				return;
			}
			setSelected([]);
		};

		const handleClick = (event, name) => {
			const selectedIndex = selected.indexOf(name);
			let newSelected = [];

			if (selectedIndex === -1) {
				newSelected = newSelected.concat(selected, name);
			} else if (selectedIndex === 0) {
				newSelected = newSelected.concat(selected.slice(1));
			} else if (selectedIndex === selected.length - 1) {
				newSelected = newSelected.concat(selected.slice(0, -1));
			} else if (selectedIndex > 0) {
				newSelected = newSelected.concat(
					selected.slice(0, selectedIndex),
					selected.slice(selectedIndex + 1),
				);
			}

			setSelected(newSelected);
		};

		const handleChangePage = (event, newPage) => {
			setPage(newPage);
		};

		const handleChangeRowsPerPage = (event) => {
			setRowsPerPage(parseInt(event.target.value, 10));
			setPage(0);
		};

		const isSelected = (name) => {
			return selected.indexOf(name) !== -1;
		}

		const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

		return (
			<div className={classes.root}>
				<MemberDialog title={title} open={open} setOpen={setOpen}
					handleEdit={handleEdit}
					handleAdd={handleAdd}
					member={selectedRow}
					setMember={setSelectedRow} />
				<Paper className={classes.paper}>
					<EnhancedTableToolbar
						handleEdit={handleEdit}
						handleAdd={handleAdd}
						numSelected={selected.length}
						handleDelete={handleDelete}
						handleOpenModal={handleOpenModal}

					/>
					<TableContainer>
						<Table
							className={classes.table}
							aria-labelledby="tableTitle"
							size={dense ? 'small' : 'medium'}
							aria-label="enhanced table"
						>
							<EnhancedTableHead

								classes={classes}
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={rows.length}
							/>
							<TableBody>
								{stableSort(rows, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const isItemSelected = isSelected(index);
										const labelId = `enhanced-table-checkbox-${index}`;
										return (
											<TableRow
												hover
												onClick={(event) => handleClick(event, index)}
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={index}
												selected={isItemSelected}
											>
												<TableCell padding="checkbox">
													<Checkbox
														checked={isItemSelected}
														inputProps={{ 'aria-labelledby': labelId }}
													/>
												</TableCell>
												<TableCell component="th" id={labelId} scope="row" padding="none">
													{row.name}
												</TableCell>
												<TableCell >{row.address}</TableCell>
												<TableCell >{row.phone}</TableCell>
												<TableCell >{row.relationship}</TableCell>
												<TableCell>{row.dateofBirth}</TableCell>
											</TableRow>
										);
									})}
								{emptyRows > 0 && (
									<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 20, 50]}
						component="div"
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Paper>
			</div>
		);
	}


	export default FamilyMembersTable;
