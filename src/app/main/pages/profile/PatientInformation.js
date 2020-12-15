import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import reducer from './store';
import { getProfile, newProfile } from './store/profileSlice';

function PatientInformation(props) {

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


	// function canBeSubmitted() {
	// 	return form.clinicName && form.clinicName.length > 0 && !_.isEqual(clinic, form);
	// }


	return (
		form && (
			<div className="p-16 sm:p-24">
				<div>
					<Grid container spacing={3} alignContent="center" alignItems="center" justify="center" >
						<Grid item xs={6} style={{ textAlign: 'center' }}>
							<Typography variant="h5">
								Patient Info
								</Typography>
							<img
								key="1"
								style={{ display: "inline" }}
								className="w-128 m-4 rounded-4"
								src="assets/images/avatars/Velazquez.jpg"
								alt="Profile"
							/>
							<TextField
								className="mt-8 mb-16"
								required
								label="Full Name"
								id="firstName"
								name="firstName"
								value={form.firstName}
								onChange={handleChange}
								variant="outlined"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												person
											</Icon>
										</InputAdornment>
									)
								}}
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								required
								label="User Name"
								id="lastName"
								name="lastName"
								value={form.lastName}
								onChange={handleChange}
								variant="outlined"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												person
											</Icon>
										</InputAdornment>
									)
								}}
								fullWidth
							/>
							<TextField
								className="mb-16"
								type="text"
								name="zipCode"
								label="Zip Code"
								variant="outlined"
								required
								fullWidth
							/>
							<Grid container className="mb-16" spacing={3}>
								<Grid item xs>
									<TextField
										type="date"
										name="birthDate"
										label="BirthDate"
										className="mr-8"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">

												</InputAdornment>
											)
										}}
										variant="outlined"
										InputLabelProps={{
											shrink: true,
										}}
										required
										fullWidth
									/>
								</Grid>
								<Grid item xs>
									<TextField
										type="text"
										name="SSN"
										label="SSN (Last 4 digits)"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">

												</InputAdornment>
											)
										}}
										variant="outlined"
										required
										fullWidth
									/>
								</Grid>
							</Grid>

							<div style={{ textAlign: 'center' }}>
								<Typography variant="h6">
									Contact Info
								</Typography>
							</div>
							<TextField
								className="mt-8 mb-16"
								required
								label="Contact Phone"
								id="contactPhone"
								name="contactPhone"
								value={form.contactPhone}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mb-16"
								type="text"
								name="email"
								label="Email"
								validations="isEmail"
								validationErrors={{
									isEmail: 'Please enter a valid email'
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												email
								</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
								fullWidth
							/>
						</Grid>
					</Grid>


					<div style={{ textAlign: 'center' }}>
						<Typography className="mt-8 mb-16" variant="h6">
							Address Info
						</Typography>
					</div>
					<Grid container spacing={3} direction="row">

						<Grid item xs={4}>
							<Card className="w-full mb-16 rounded-8">
								<AppBar position="static" elevation={0}>
									<Toolbar className="px-8" variant="dense">
										<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
											Address - Home
												</Typography>
									</Toolbar>
								</AppBar>

								<CardContent>
									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">Address</Typography>

										<div className="flex items-center">
											<Typography>{'Av Nossa Senha do Carmo'}</Typography>
											<Icon className="text-16 mx-4" color="action">
												location_on
													</Icon>
										</div>
									</div>

									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">Country</Typography>
										<Typography>{'Brazil'}</Typography>
									</div>

									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">City</Typography>
										<Typography>{'Belo Horizonte'}</Typography>
									</div>

									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">State</Typography>
										<Typography>{'Minas Gerais'}</Typography>
									</div>

									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">ZIP Code</Typography>
										<Typography>{'33003000'}</Typography>
									</div>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className="w-full mb-16 rounded-8">
								<AppBar position="static" elevation={0}>
									<Toolbar className="px-8" variant="dense">
										<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
											Address - Work
												</Typography>
									</Toolbar>
								</AppBar>

								<CardContent>

									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">Address</Typography>

										<div className="flex items-center">
											<Typography>{'Av Nossa Senha do Carmo'}</Typography>
											<Icon className="text-16 mx-4" color="action">
												location_on
													</Icon>
										</div>
									</div>

									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">Country</Typography>
										<Typography>{'Brazil'}</Typography>
									</div>

									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">City</Typography>
										<Typography>{'Belo Horizonte'}</Typography>
									</div>

									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">State</Typography>
										<Typography>{'Minas Gerais'}</Typography>
									</div>

									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">ZIP Code</Typography>
										<Typography>{'33003000'}</Typography>
									</div>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card variant="outlined" className="w-full mb-16 rounded-8">
								<CardContent>
									<Grid container direction="column" alignItems="center">
										<Grid item xs={2}>
											<Icon className="text-56" color="action">
												add
											</Icon>
										</Grid>
										<Grid item xs={10}>
											<Typography className="mb-4 text-32">Add Address</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Grid>


					<div style={{ textAlign: 'center' }}>
						<Typography className="mt-8 mb-16" variant="h6">
							Insurance Plan Info
						</Typography>
					</div>

					<Grid container spacing={3} direction="row">

						<Grid item xs={4}>
							<Card className="w-full mb-16 rounded-8">
								<AppBar position="static" elevation={0}>
									<Toolbar className="px-8" variant="dense">
										<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
											Insurance Plan - Meridian health
										</Typography>
									</Toolbar>
								</AppBar>

								<CardContent>
									<div className="mb-12">
										<Typography className="font-bold mb-4 text-15">Member Name</Typography>
										<Typography>{'Jhon Doe'}</Typography>
									</div>

									<Grid container spacing={3}>
										<Grid item>
											<Typography className="font-bold mb-4 text-15">Member Id</Typography>
											<Typography>{'523448999'}</Typography>
										</Grid>
										<Grid item>
											<Typography className="font-bold mb-4 text-15">Member Service</Typography>
											<Typography>{'888-437-0606'}</Typography>
										</Grid>
									</Grid>

									<Grid container spacing={3}>
										<Grid item>
											<Typography className="font-bold mb-4 text-15">Effective Date</Typography>

											<div className="flex items-center">
												<Typography>{'23/06/2019'}</Typography>
											</div>	
										</Grid>

										<Grid item>
											<Typography className="font-bold mb-4 text-15">Health Plan</Typography>
											<Typography>{'Prime'}</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>					
						<Grid item xs={4}>
							<Card variant="outlined" className="w-full mb-16 rounded-8">
								<CardContent>
									<Grid container direction="column" alignItems="center">
										<Grid item xs={2}>
											<Icon className="text-56" color="action">
												add
											</Icon>
										</Grid>
										<Grid item xs={10}>
											<Typography className="mb-4 text-32">Add Plan</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</div>

			</ div >
		)
	);
}

export default withReducer('ProfilesApp', reducer)(PatientInformation);
