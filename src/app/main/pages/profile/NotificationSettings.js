import Typography from '@material-ui/core/Typography';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { newProfile, getProfile } from './store/profileSlice';
import reducer from './store';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Divider } from '@material-ui/core';

function NotificationSettings(props) {

	const dispatch = useDispatch();
	const clinic = useSelector(({ ProfilesApp }) => ProfilesApp.profile);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateProfileState() {
			const { clinicId } = routeParams;
			if (clinicId === 'new') {
				dispatch(newProfile());
			} else {
				dispatch(getProfile(routeParams));
			}
		}

		updateProfileState();
	}, [dispatch, routeParams]);


	useEffect(() => {
		if ((clinic && !form) || (clinic && form && clinic.id !== form.id)) {
			setForm(clinic);
		}
	}, [form, clinic, setForm]);


	return (
		form && (
			<div className="p-16 sm:p-24">
				<div>

					<div className="mt-8 mb-32" style={{ textAlign: 'center' }}>
						<Typography variant="h4">
						Types of Notification
								</Typography>
					</div>

					<Grid container spacing={3} alignContent="center" direction="column">
						<Grid item xs={4}>
							<div style={{ textAlign: 'center' }}>
								<Typography variant="h6">
									Email Notification
								</Typography>
							</div>
							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.firstAppointment} onChange={handleChange} id="firstAppointment"
									name="firstAppointment" />}
								label="Enable Email Notifications"
							/>
							
							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.firstAppointment} onChange={handleChange} id="firstAppointment"
									name="firstAppointment" />}
								label="Enable Text Message  Notifications"
							/>

							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.firstAppointment} onChange={handleChange} id="firstAppointment"
									name="firstAppointment" />}
								label="Enable WhatsApp Notifications"
							/>
							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.notifications} onChange={handleChange} id="notifications"
									name="notifications" />}
								label="Enable Notifications to My Caregivers"
							/>
							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.includeTravelTime} onChange={handleChange} id="includeTravelTime"
									name="includeTravelTime" />}
								label="Send Copy of Exames to My Personal email"
							/>
						</Grid>
						<Divider />
						<Grid item xs={4}>
							<div style={{ textAlign: 'center' }}>
								<Typography variant="h6">
								When Should We Notify You?
								</Typography>
							</div>

							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.firstAppointment} onChange={handleChange} id="firstAppointment"
									name="firstAppointment" />}
								label="1 Day Before Appointments"
							/>
							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.notifications} onChange={handleChange} id="notifications"
									name="notifications" />}
								label="When Receive Messages From My Providers"
							/>
							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.includeTravelTime} onChange={handleChange} id="includeTravelTime"
									name="includeTravelTime" />}
								label="Always Notify my Caregiver"
							/>

							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.includeTravelTime} onChange={handleChange} id="includeTravelTime"
									name="includeTravelTime" />}
								label="When I Have a Vaccine Overdue"
							/>
							
							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.includeTravelTime} onChange={handleChange} id="includeTravelTime"
									name="includeTravelTime" />}
								label="When I Have a New Test Result"
							/>
							<FormControlLabel
								className="mt-8 mb-16"
								control={<Switch checked={form.includeTravelTime} onChange={handleChange} id="includeTravelTime"
									name="includeTravelTime" />}
								label="Send email to My Providers When I Have a New Test Result"
							/>
						</Grid>
					</Grid>
				</div>
			</ div >
		)
	);
}

export default withReducer('ProfilesApp', reducer)(NotificationSettings);
