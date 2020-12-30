import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { useTheme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from '../store';
import { setGeoCoordinate, saveClinic, getClinic, newClinic, updateClinic } from '../store/clinicSlice.js';
import { getUsers } from '../../../../auth/store/userSlice';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

import Geocode from 'react-geocode';
import Autocomplete from '@material-ui/lab/Autocomplete';

const PrimaryButton = withStyles(theme => ({
	root: {
		color: '#ffffff',
		backgroundColor: '#24aae0',
		'&:hover': {
			backgroundColor: '#1d8ab5'
		}
	}
}))(Button);

function ClinicBranch(props) {
	const dispatch = useDispatch();
	const clinic = useSelector(({ ClinicApp }) => ClinicApp.clinic);
	const users = useSelector(({ auth }) => auth.user);
	console.log('users', users);
	const theme = useTheme();
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateClinicState() {
			dispatch(getUsers());
			const { clinicId } = routeParams;
			console.log('update', clinicId);
			if (clinicId == 'new') {
				console.log('salvando');
				dispatch(newClinic());
			} else {
				console.log('pegando');
				dispatch(getClinic(routeParams));
			}
		}

		updateClinicState();
	}, [dispatch, routeParams]);

	
	const handleSubmit = form => {
		console.log('handlesubmit', form);
		if (form.id == null) {
			dispatch(saveClinic(form));
		} else {
			dispatch(updateClinic(form));
		}
	};
	const getAddress = e => {
		e.persist();
		Geocode.setApiKey('AIzaSyB0pi7GKm7Fd39VMSmIiz8uJweF9tBTkYs');

		Geocode.fromAddress('Eiffel Tower').then(
			response => {
				dispatch(setGeoCoordinate(response.results[0].geometry.location));
			},
			error => {
				console.error(error);
			}
		);

	};
	useEffect(() => {
		if ((clinic && !form) || (clinic && form && clinic.id !== form.id)) {
			setForm(clinic);
		}
	}, [form, clinic, setForm]);

	function canBeSubmitted() {
		return form.companyName && form.companyName.length > 0 && !_.isEqual(clinic, form);
	}
	// return(<h1>Hello world</h1>)
	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<Typography
								className="normal-case flex items-center sm:mb-12"
								component={Link}
								role="button"
								to="."
								color="inherit"
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">Clinics</span>
							</Typography>

							<div className="flex items-center max-w-full">
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.companyName ? form.companyName : 'New Clinic'}
										</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<PrimaryButton
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => handleSubmit(form)}
							>
								Save
							</PrimaryButton>
						</FuseAnimate>
					</div>
				)
			}
			content={
				form && (
					<div className="p-16 sm:p-24">
						<div>
							<Grid container spacing={3}>
								<Grid item xs={6}>
									{/* <Autocomplete
										id="combo-box-demo"
										options={top100Films}
										getOptionLabel={option => option.title}
										style={{ width: 300 }}
										renderInput={params => (
											<TextField {...params} label="Usuário" variant="outlined" />
										)}
									/> */}
									<br></br>
									<TextField
										className="mt-8 mb-16"
										required
										label="Clinic Name"
										id="companyName"
										name="companyName"
										value={form.companyName}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mt-8 mb-16"
										required
										label="Email"
										id="email"
										name="email"
										value={form.email}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<Grid container spacing={3}>
										<Grid item xs={6}>
											<TextField
												className="mt-8 mb-16"
												required
												label="Zip Code"
												id="address.zipCode"
												name="address.zipCode"
												value={form.address.zipCode}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mt-8 mb-16"
												required
												label="Country"
												id="address.country"
												name="address.country"
												value={form.address.country}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
									</Grid>

									<TextField
										className="mt-8 mb-16"
										required
										label="Address Line 1"
										id="address.addressLine1"
										name="address.addressLine1"
										value={form.address.addressLine1}
										onChange={handleChange}
										onBlur={e => getAddress(e)}
										variant="outlined"
										fullWidth
									/>

									<Grid container spacing={3}>
										<Grid item xs={6}>
											<TextField
												className="mt-8"
												required
												label="City"
												id="address.city"
												name="address.city"
												value={form.address.city}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mt-8"
												required
												label="State / Province / Region"
												id="address.state"
												name="address.state"
												value={form.address.state}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mb-16"
												required
												label="Telephone"
												id="phone"
												name="phone"
												value={form.phone}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>

											<TextField
												className="mt-8 mb-16"
												required
												label="TAX ID"
												id="taxId"
												name="taxId"
												value={form.taxId}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('ClinicApp', reducer)(ClinicBranch);
