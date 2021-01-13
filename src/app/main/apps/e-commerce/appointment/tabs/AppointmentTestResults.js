import FuseAnimate from '@fuse/core/FuseAnimate';
import _ from '@lodash';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { orange } from '@material-ui/core/colors';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentTests, openNewTestDialog, deleteAppointmentTest } from '../../store/AppointmentTestSlice';
import TestDialog from '../dialogs/TestDialog';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'react-moment';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
	typeIcon: {
		'&.PDF:before': {
			content: "'picture_as_pdf'",
			color: '#F44336'
		},
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		}
	},
	margin: {
		margin: theme.spacing(1),
	},
	textField: {
		width: '25ch',
	},
	appointmentImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	appointmentImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	appointmentImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $appointmentImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $appointmentImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $appointmentImageFeaturedStar': {
				opacity: 1
			}
		}
	},
	avatarMain: {
		width: theme.spacing(5),
		height: theme.spacing(5),
		marginLeft: '5px'
	},
}));

function AppointmentTestResult(props) {
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const files = useSelector(state => state.AppointmentsApp.appointmentTest.files);

	const theme = useTheme();
	useEffect(() => {
		dispatch(getAppointmentTests(props.appointmentId));
	}, [dispatch]);

	function handleOpenDialog() {
		dispatch(openNewTestDialog());
	}
	function handleDelete(item) {
		dispatch(deleteAppointmentTest(item));
	}

	const classes = useStyles(props);

	return (
		<div>
			<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
				<span className="mx-4">Add a Test Results</span>
				<IconButton onClick={ev => handleOpenDialog()} aria-label="Add Test Result">
					<BackupIcon />
				</IconButton>
			</Typography>
			<FuseAnimate animation="transition.slideUpIn" delay={300}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
							<TableCell>Name</TableCell>
							<TableCell className="hidden sm:table-cell">Type</TableCell>
							<TableCell className="text-center hidden sm:table-cell">Size</TableCell>
							<TableCell className="hidden sm:table-cell">Modified</TableCell>
							<TableCell className="hidden sm:table-cell">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{files && files.map(item => {
							return (
								<TableRow
									key={item.id}
									hover
									// onClick={event => dispatch(setSelectedItem(item.id))}
									// selected={item.id === selectedItemId}
									className="cursor-pointer"
								>
									<TableCell className="max-w-64 w-64 p-0 text-center">
										<Icon className={clsx(classes.typeIcon, item.type)} />
									</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell >{item.type}</TableCell>
									<TableCell className="text-center">
										{item.size === '' ? '-' : item.size} MB
									</TableCell>
									<TableCell >
										<Moment Date={item.createDate} />
									</TableCell>
									<TableCell>
										<Tooltip title="Delete">
											<IconButton onClick={ev => handleDelete(item)} aria-label="delete">
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseAnimate>
			<TestDialog appointmentId={props.appointmentId} />
		</div>
	);
}

export default AppointmentTestResult;