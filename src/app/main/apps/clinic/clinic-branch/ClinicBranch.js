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
import { getClinicBranch, newClinicBranch, saveClinicBranch, setGeoCoordinate } from '../store/clinicBranchSlice';
import geocodingApi from '../../../../services/geocodingApi';

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
	const clinic = useSelector(({ ClinicBranchsApp }) => ClinicBranchsApp.clinicBranch);
	console.log('pegando state', clinic);
	const theme = useTheme();
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	useDeepCompareEffect(() => {
		function updateClinicBranchState() {
			const { clinicId } = routeParams;
			if (clinicId === 'new') {
				dispatch(newClinicBranch());
			} else {
				dispatch(getClinicBranch(routeParams));
			}
		}

		updateClinicBranchState();
	}, [dispatch, routeParams]);

	const getAddress = e => {
		e.persist();
		geocodingApi
			.get(clinic.addressLine2)
			.then(res => dispatch(setGeoCoordinate(res.data.results[0].geometry.location)));
	};
	useEffect(() => {
		if ((clinic && !form) || (clinic && form && clinic.id !== form.id)) {
			setForm(clinic);
		}
	}, [form, clinic, setForm]);

	function canBeSubmitted() {
		return form.clinicName && form.clinicName.length > 0 && !_.isEqual(clinic, form);
	}
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
											{form.clinicName ? form.clinicName : 'New Clinic'}
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
								onClick={() => dispatch(saveClinicBranch(form))}
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
									<TextField
										className="mt-8 mb-16"
										required
										label="Clinic Name"
										id="clinicName"
										name="clinicName"
										value={form.clinicName}
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
												id="zipcode"
												name="zipcode"
												value={form.zipcode}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mt-8 mb-16"
												required
												label="Number"
												id="number"
												name="number"
												value={form.number}
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
										id="AddressLine1"
										name="AddressLine1"
										value={form.addressLine1}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mt-8 mb-16"
										required
										label="Address Line 2"
										id="addressLine2"
										name="addressLine2"
										value={form.addressLine2}
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
												id="city"
												name="city"
												value={form.city}
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
												id="state"
												name="state"
												value={form.state}
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
												id="telephone"
												name="telephone"
												value={form.telephone}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>

											<TextField
												className="mt-8 mb-16"
												required
												label="TAX ID"
												id="TaxId"
												name="TaxId"
												value={form.TaxId}
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

export default withReducer('ClinicBranchsApp', reducer)(ClinicBranch);
