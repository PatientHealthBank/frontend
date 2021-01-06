import React, { useEffect, useState } from 'react';
import CheckIn from './CheckIn';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
// import { selectAppointmentsWidget, getAppointments } from '../store/appointmenWidgetSlice';
import { useDispatch, useSelector } from 'react-redux';

//To Do migra table pra share component
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function CareTeamWidget(props) {
	const dispatch = useDispatch();

	// const appointments = useSelector(selectAppointmentsWidget);
	// const [data, setData] = useState(appointments);

	// useEffect(() => {
	// 	if (appointments.length == 0 && appointments) {
	// 		dispatch(getAppointments());
	// 	}
	// 	{
	// 		setData(appointments);
	// 	}
	// }, [dispatch, appointments]);

	return (
		<Grid item sm={12} md={7} lg={6}>
			<Card className="w-full rounded-8 shadow-1">
				<div className="p-16 px-4 flex flex-row items-center justify-between">
					<Typography className="h1 px-12">Care Team</Typography>

					<div>
						<IconButton aria-label="more">
							<Icon>more_vert</Icon>
						</IconButton>
					</div>
				</div>
				<AvatarGroup max={5}>
					<DoctorComp
						img={'assets\\images\\avatars\\Nancy.jpg'}
						classe={classes.avatar}
						name="Samanta Nole"
						specialty="Physical Therapist"
					></DoctorComp>
					<DoctorComp
						img={'assets\\images\\avatars\\Shepard.jpg'}
						classe={classes.avatar}
						name="Sam Smith"
						specialty="Sports Medicine"
					></DoctorComp>
					<DoctorComp
						img={'assets\\images\\avatars\\vincent.jpg'}
						classe={classes.avatar}
						name="Sam Tunner"
						specialty="Sports Medicine"
					></DoctorComp>
					<DoctorComp
						img={'assets\\images\\avatars\\Helen.jpg'}
						classe={classes.avatar}
						name="Hanna Smith"
						specialty="Sports Medicine"
					></DoctorComp>
					<DoctorComp
						img={'assets\\images\\avatars\\doctor1.png'}
						classe={classes.avatar}
						name="Sam Smith"
						specialty="Sports Medicine"
					></DoctorComp>
					<DoctorComp
						img={'assets\\images\\avatars\\doctor3.jpg'}
						classe={classes.avatar}
						name="Hanna Tunner"
						specialty="Sports Medicine"
					></DoctorComp>
				</AvatarGroup>
			</Card>
		</Grid>
	);
}

export default withReducer('CareTeamWidgetApp', reducer)(CareTeamWidget);
