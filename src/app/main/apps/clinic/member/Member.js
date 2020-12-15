import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { orange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from '../store';
import { getMember, newMember, saveMember } from '../store/memberSlice';

const useStyles = makeStyles(theme => ({

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

	useDeepCompareEffect(() => {
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
	}, [form, member, setForm]);

	function canBeSubmitted() {
		return form.clinic && form.clinic.length > 0 && !_.isEqual(member, form);
	}

	// if ((!member || (member && routeParams.memberId !== member.id)) && routeParams.memberId !== 'new') {
	// 	return <FuseLoading />;
	// }

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
											{form.name ? `${form.name} - ${form.specialty}` : 'New Member'}
										</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<PrimaryButton
								className="whitespace-no-wrap normal-case"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(saveMember(form))}
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
										label="Full Name"
										id="name"
										name="name"
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
										validations={{
											minLength: 4
										}}
										validationErrors={{
											minLength: 'Min character length is 4'
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
									/>
									<Grid container spacing={3}>
										<Grid item xs={6}>
											<FormControl fullWidth variant="outlined" className="mt-8 mb-16">
												<InputLabel htmlFor="outlined-age-native-simple">Occupation</InputLabel>
												<Select
													native
													id="occupation"
													name="occupation"
													value={form.occupation}
													onChange={handleChange}
													label="Occupation"
													autoFocus
													inputProps={{
														name: 'occupation',
														id: 'outlined-age-native-simple',
													}}
												>
													<option aria-label="None" value="" />
													<option value={1}>Dermatologists Doctor</option>
													<option value={3}>Family Medicine</option>
													<option value={4}>Gastroenterology</option>
													<option value={5}>Neurology</option>
													<option value={6}>Neurosurgery</option>
													<option value={7}>Pathology</option>
													<option value={8}>Pediatrics</option>
													<option value={9}>Psychiatry</option>
													<option value={10}>Radiology</option>
													<option value={11}>Urology</option>
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant="outlined" className="mt-8 mb-16">
												<InputLabel htmlFor="outlined-age-native-simple">Profile Type</InputLabel>
												<Select
													native
													id="profileType"
													name="profileType"
													value={form.profileType}
													onChange={handleChange}
													label="Profile Type"
													autoFocus
													inputProps={{
														name: 'profileType',
														id: 'outlined-age-native-simple',
													}}
												>
													<option aria-label="None" value="" />
													<option value={1}>Health professional</option>
												</Select>
											</FormControl>
										</Grid>
									</Grid>

									<Grid container spacing={3}>
										<Grid item xs={6}>
											<FormControl id="meansTransport" className="mt-8 mb-16" component="fieldset">
												<FormLabel component="legend">Clinic Branch</FormLabel>
												<RadioGroup aria-label="gender" id="meansTransport" name="meansTransport" value={form.meansTransport} onChange={handleChange}>
													<FormControlLabel value="Own" control={<Radio />} label="Orthopedic Surgeon - Clinic 1" />
													<FormControlLabel value="Uber" control={<Radio />} label="Physical Therapist - Clinic 2" />
													<FormControlLabel value="Taxi" control={<Radio />} label="Sports Medicine - Clinic 3" />
												</RadioGroup>
											</FormControl>
										</Grid>
										<Grid item xs={6}> 
											<FormControl id="admAccess" name="admAccess" component="fieldset" className={classes.formControl}>
												<FormLabel component="legend">Admin Access</FormLabel>
												<FormGroup>
													<FormControlLabel
														control={<Checkbox checked={form.admAccess} id="admAccess" name="admAccess" onChange={handleChange} />}
														label="Clinic 1"
													/>
												</FormGroup>
											</FormControl>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={4}>
									<img
										src="assets/images/avatars/Profile.png"
										alt="beach"
										style={{
											maxWidth: '640px',
											width: '100%'
										}}
										className="rounded-6"
									/>
								</Grid>
							</Grid>
						</div>

					</ div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('MembersApp', reducer)(Member);
