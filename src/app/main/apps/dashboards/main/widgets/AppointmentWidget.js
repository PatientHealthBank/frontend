import React, { useEffect, useState } from 'react';
import CheckIn from './CheckIn';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { selectAppointmentsWidget, getAppointments } from '../store/appointmenWidgetSlice';
import { useDispatch, useSelector } from 'react-redux';

//To Do migra table pra share component
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useForm, useDeepCompareEffect, useDebounce } from '@fuse/hooks';

function AppointmentWidget(props) {
	const dispatch = useDispatch();

	const appointments = useSelector(selectAppointmentsWidget);
	const [data, setData] = useState(appointments);
	// todor receber estado do componente pai

	useEffect(() => {
		setData(appointments);
	}, [dispatch, appointments]);

	useDeepCompareEffect(() => {
		dispatch(getAppointments());
	}, [dispatch]);

	return (
		appointments && (
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
										{Date(row.scheduleDate) > 8 ? (
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
		)
	);
}

export default withReducer('AppointmentWidgetApp', reducer)(AppointmentWidget);
