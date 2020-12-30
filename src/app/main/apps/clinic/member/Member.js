import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { orange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import FuseLoading from '@fuse/core/FuseLoading';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from '../store';
import { getMember, newMember, saveMember, updateMember } from '../store/memberSlice';
import phbApi from '../../../../services/phbApi';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
	KeyboardTimePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	memberImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	memberImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	memberImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $memberImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $memberImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $memberImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const PrimaryButton = withStyles((theme) => ({
	root: {
		color: "#ffffff",
		backgroundColor: '#24aae0',
		'&:hover': {
			backgroundColor: '#1d8ab5',
		},
	},
}))(Button);


function Member(props) {
	const dispatch = useDispatch();
	const member = useSelector(({ MembersApp }) => MembersApp.member);

	const theme = useTheme();
	const classes = useStyles(props);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	const [specialties, setSpecialties] = React.useState([]);
	const [clinicalInterest, setClinicalInterest] = React.useState([]);

	useDeepCompareEffect(() => {
		findSpecialties();

		function updateMemberState() {
			const { membersId } = routeParams;
			if (membersId === 'new') {
				dispatch(newMember());
			} else {
				dispatch(getMember(routeParams));
			}
		}

		updateMemberState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((member && !form) || (member && form && member.id !== form.id)) {
			setForm(member);
		}

		if (form && form.specialty) {
			findClinicalInterest(form.specialty.join());
		}

	}, [form, member, setForm]);

	React.useEffect(() => {
		findSpecialties();
	}, []);

	var findSpecialties = () => {
		phbApi().get('/specialty/List').then(res => {
			setSpecialties(res.data)
		});
	}
	var findClinicalInterest = (value) => {
		phbApi().get('/clinicalinterest/BySpecialties', { params: { specialty: value } }).then(res => {
			setClinicalInterest(res.data);
		});
	}

	function handleSave(member) {
		const { membersId } = routeParams;
		if (membersId === 'new') {
			dispatch(saveMember(member));
		} else {
			dispatch(updateMember(member));
		}
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
								<span className="mx-4">Members</span>
							</Typography>

							<div className="flex items-center max-w-full">
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.name ? `${form.name}` : 'New Member'}
										</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<PrimaryButton
								className="whitespace-no-wrap normal-case"
								color="secondary"
								// disabled={!canBeSubmitted()}
								onClick={() => handleSave(form)}
							>
								Save
							</PrimaryButton>
						</FuseAnimate>
					</div>
				)
			}
			content={
				(form && (routeParams.membersId == "new" || form.name)) ? (
					<div className="p-16 sm:p-24">
						<div>
							<Grid container spacing={3}>
								<Grid item xs={4}>
									<Typography className="text-16 sm:text-20 truncate mb-16">
										{'Basic Info'}
									</Typography>
									<TextField
										className="mb-16"
										required
										label="Full Name"
										id="name"
										name="name"
										autoFocus
										value={form.name}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mb-16"
										id="email"
										fullWidth
										name="email"
										type="text"
										label="Email"
										value={form.email}
										onChange={handleChange}
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
									/>

									<TextField
										className="mb-16"
										id="phone"
										fullWidth
										name="phone"
										type="text"
										label="Phone"
										value={form.phone}
										onChange={handleChange}
										variant="outlined"
										required
									/>
									<Grid container spacing={3}>
										<Grid item xs={6}>
											<TextField
												className="mb-16"
												id="licenseNumber"
												fullWidth
												name="licenseNumber"
												type="text"
												label="LicenseNumber"
												value={form.licenseNumber}
												onChange={handleChange}
												variant="outlined"
												required
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mb-16"
												id="taxId"
												fullWidth
												name="taxId"
												type="text"
												label="TaxId"
												value={form.taxId}
												onChange={handleChange}
												variant="outlined"
												required
											/>
										</Grid>
									</Grid>

									<Grid container spacing={3}>
										<Grid item xs={6}>
											<FormControl fullWidth variant="outlined" className="mb-16">
												<InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
												<Select
													native
													id="genderId"
													name="genderId"
													value={form.genderId}
													onChange={handleChange}
													label="Gender"
													inputProps={{
														name: 'genderId',
														id: 'outlined-age-native-simple',
													}}
												>
													<option aria-label="None" value="" />
													<option value={1}>Male</option>
													<option value={2}>Female</option>
													<option value={3}>Others</option>
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mb-16"
												id="npi"
												fullWidth
												name="npi"
												type="text"
												label="NPI"
												value={form.npi}
												onChange={handleChange}
												variant="outlined"
												required
											/>
										</Grid>
									</Grid>
									<Typography className="text-16 sm:text-20 truncate mb-16">
										{'Appointments'}
									</Typography>

									<Grid container spacing={3}>
										<Grid item xs={6}>
											<TextField
												className="mb-16"
												id="startJob"
												fullWidth
												name="startJob"
												type="time"
												label="Start Job"
												value={form.startJob}
												onChange={handleChange}
												variant="outlined"
												required
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mb-16"
												id="endJob"
												fullWidth
												name="endJob"
												type="time"
												label="End Job"
												value={form.endJob}
												onChange={handleChange}
												variant="outlined"
												required
											/>
										</Grid>
									</Grid>
									<Grid container spacing={3}>
										<Grid item xs={6}>
											<TextField
												className="mb-16"
												id="appointmentInterval"
												fullWidth
												name="appointmentInterval"
												type="number"
												label="Appointment Interval"
												value={form.appointmentInterval}
												onChange={handleChange}
												variant="outlined"
												required
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControlLabel
												control={<Switch checked={form.telemedicine} onChange={handleChange} id="telemedicine"
													name="telemedicine" />}
												label="Telemedicine"
											/>
										</Grid>
									</Grid>
									<Typography className="text-16 sm:text-20 truncate mb-16">
										{'Specialties'}
									</Typography>

									<Grid container spacing={3}>
										<Grid item xs={6}>
											<FormControl fullWidth variant="outlined" className="mb-16">
												<InputLabel htmlFor="outlined-specialty-chip-label">Specialty</InputLabel>
												<Select
													id="specialty"
													name="specialty"
													value={form.specialty}
													onChange={handleChange}
													label="Specialty"
													inputProps={{
														name: 'specialty',
														id: 'outlined-specialty-chip-label',
													}}
													multiple
													renderValue={(selected) => (
														<div className={classes.chips}>
															{selected.map((value) => (
																<Chip key={value} label={specialties.find(x => x.id === value)?.description} className={classes.chip} />
															))}
														</div>
													)}
													MenuProps={MenuProps}
												>
													{specialties.map((specialty) => (
														<MenuItem key={specialty.id} value={specialty.id}>
															<Checkbox checked={form.specialty?.indexOf(specialty.id) > -1} />
															<ListItemText primary={specialty.description} />
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>

										<Grid item xs={6}>
											<FormControl fullWidth variant="outlined" className="mb-16">
												<InputLabel htmlFor="outlined-clinicalInterest-chip-label">Clinical Interest</InputLabel>
												<Select
													id="clinicalInterest"
													name="clinicalInterest"
													value={form.clinicalInterest}
													onChange={handleChange}
													label="Clinical Interest"
													inputProps={{
														name: 'clinicalInterest',
														id: 'outlined-clinicalInterest-chip-label',
													}}
													multiple
													renderValue={(selected) => (
														<div className={classes.chips}>
															{selected.map((value) => (
																<Chip key={value} label={clinicalInterest.find(x => x.id === value)?.description} className={classes.chip} />
															))
															}
														</div>
													)}
													MenuProps={MenuProps}
												>
													{clinicalInterest.map((cliInterest) => (
														<MenuItem key={cliInterest.id} value={cliInterest.id}>
															<Checkbox checked={form.clinicalInterest.indexOf(cliInterest.id) > -1} />
															<ListItemText primary={cliInterest.description} />
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
									</Grid>

									<TextField
										className="mb-16"
										id="description"
										fullWidth
										name="description"
										type="text"
										label="Description"
										value={form.description}
										onChange={handleChange}
										variant="outlined"
										required
										multiline
										rows={5}
									/>
								</Grid>
								<Grid item xs={4}>
									<Typography className="text-16 sm:text-20 truncate mb-8">
										{'Address'}
									</Typography>

									<TextField
										className="mt-8 mb-16"
										required
										label="Address Line 1"
										id="addressLine1"
										name="addressLine1"
										value={form.addressLine1}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mb-16"
										required
										label="Address Line 2"
										id="addressLine2"
										name="addressLine2"
										value={form.addressLine2}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mb-16"
										required
										label="Country"
										id="country"
										name="country"
										value={form.country}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mb-16"
										required
										label="City"
										id="city"
										name="city"
										value={form.city}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mb-16"
										required
										label="State"
										id="state"
										name="state"
										value={form.state}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mb-16"
										required
										label="ZipCode"
										id="zipCode"
										name="zipCode"
										value={form.zipCode}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
								</Grid>
							</Grid>
						</div>

					</ div>
				) : (<FuseLoading></FuseLoading>)
			}
			innerScroll
		/>
	);
}

export default withReducer('MembersApp', reducer)(Member);
