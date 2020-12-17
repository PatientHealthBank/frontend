import Typography from '@material-ui/core/Typography';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Divider } from '@material-ui/core';
import phbApi from 'app/services/phbApi';
import reducer from './store';
import { newProfile, getProfile } from './store/profileSlice';

function NotificationSettings(props) {
	const dispatch = useDispatch();
	const clinic = useSelector(({ ProfilesApp }) => ProfilesApp.profile);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	const [categories, setParameters] = React.useState([]);

	const notificationsParameters = () => {
		Promise.all([
			phbApi().get('/Parameter/Category', { params: { category: 'Email Notification' } }),
			phbApi().get('/Parameter/Category', { params: { category: 'Whe Should We Notify You?' } })
		]).then(data => {
			setParameters(data);
		});
	};

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
			notificationsParameters();
			setForm(clinic);
		}
	}, [form, clinic, setForm]);

	return (
		form && (
			<div className="p-16 sm:p-24">
				<div className="mt-8 mb-32" style={{ textAlign: 'center' }}>
					<Typography variant="h4">Types Of Notification</Typography>
				</div>
				{categories.map(category => (
					<div>
						<Grid container spacing={3} alignContent="center" direction="column">
							<div style={{ textAlign: 'center' }}>
								<Typography variant="h6">{category.data[0].category}</Typography>
							</div>
							<Grid item xs={4}>
								{category.data.map(parameter => (
									<div>
										<FormControlLabel
											className="mt-8 mb-16"
											control={
												<Switch
													checked={form.firstAppointment}
													onChange={handleChange}
													id="firstAppointment"
													name="firstAppointment"
												/>
											}
											label={parameter.name}
										/>
									</div>
								))}
							</Grid>
						</Grid>
					</div>
				))}
			</div>
		)
	);
}

export default withReducer('ProfilesApp', reducer)(NotificationSettings);
