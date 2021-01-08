import React, { useEffect, useState } from 'react';
import CheckIn from './CheckIn';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { selectAppointmentsWidget, getAppointments } from '../store/appointmenWidgetSlice';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDeepCompareEffect } from '@fuse/hooks';

function AppointmentWidget(props) {
	const dispatch = useDispatch();

	const appointments = useSelector(selectAppointmentsWidget);
	const [data, setData] = useState(appointments);
	// todor receber estado do componente pai

	useEffect(() => {
		setData(appointments);
	}, [dispatch, appointments]);

	useDeepCompareEffect(() => {
		if (appointments.length === 0 && appointments) {
			dispatch(getAppointments());
		}
	}, [dispatch]);

	return (
		appointments && (
			<Card className="w-full rounded-8 shadow-1" style={{ height: '359px' }}>
				<div className="p-16 px-4 flex flex-row items-center justify-between">
					<Typography className="h1 px-12">Appointments</Typography>

					<div>
						<IconButton aria-label="more">
							<Icon>more_vert</Icon>
						</IconButton>
					</div>
				</div>

				<div className="w-full p-8 min-h-420 h-420">
					<TableContainer style={{ height: '278px' }}>
						<Table aria-label="simple table sticky-table">
							<TableHead>
								<TableRow>
									<TableCell align="center">Appointments</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{appointments
									.sort((a, b) => Date(b.scheduleDate) - Date(a.scheduleDate))
									.slice(0, 4)
									.map(row => (
										<TableRow key={row.patient.name}>
											<TableCell align="center">
												{row.specialty.description}
												<br /> {Date(row.scheduleDate)}
											</TableCell>
											<TableCell align="center">
												{Date(row.scheduleDate) <= Date(row.createDate) ? (
													<CheckIn
														specialty={row.specialty.description}
														date={Date(row.scheduleDate)}
													/>
												) : (
													'Done'
												)}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</Card>
		)
	);
}

export default withReducer('AppointmentWidgetApp', reducer)(AppointmentWidget);
