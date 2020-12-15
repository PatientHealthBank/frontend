import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import { orange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from '../store';
import { getPatient, newPatient } from '../store/patientSlice';
import PatientAppointments from './tabs/PatientAppointments';
import PatientComments from './tabs/PatientComments';
import PatientExams from './tabs/PatientExams';
import PatientProfile from './tabs/PatientProfile';
import PatientTreatments from './tabs/PatientTreatments';
import PatientVideoLibrary from './tabs/PatientVideoLibrary';


const useStyles = makeStyles(theme => ({
	typeIcon: {
		'&.PDF:before': {
			content: "'picture_as_pdf'",
			color: '#F44336'
		},
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		}
	},
	margin: {
		margin: theme.spacing(1),
	},
	textField: {
		width: '25ch',
	},
	patientImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	patientImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	patientImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $patientImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $patientImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $patientImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));
const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
};


function Patient(props) {
	const dispatch = useDispatch();
	const patient = useSelector(({ providerApp }) => providerApp.patient);

	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [comments, setComments] = useState(dummyData);
	const [comment, setComment] = useState("");
	// eslint-disable-next-line
	const { form, handleChange, setForm } = useForm(null);
	const [specialtyDescription, setSpecialty] = React.useState("Specialty")
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updatePatientState() {
			const { patientId } = routeParams;

			if (patientId === 'new') {
				dispatch(newPatient());
			} else {
				dispatch(getPatient(routeParams));
			}
		}

		updatePatientState();
	}, [dispatch, routeParams]);

	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}
	useEffect(() => {
		if ((patient && !form) || (patient && form && patient.id !== form.id)) {
			console.log(patient.treatments);
			setForm(patient);
		}
	}, [form, patient, setForm]);
	useEffect(() => {
		if (form && form.specialty && specialtyDescription === "Specialty") {
			setSpecialty(form.specialtyDescription)
		}
	}, [form, specialtyDescription])

	function handleChangeTab(event, value) {
		setTabValue(value);
	}


	// function canBeSubmitted() {
	// 	return form.clinic && form.clinic.length > 0 && !_.isEqual(patient, form);
	// }

	if ((!patient || (patient && routeParams.patientId !== patient.id)) && routeParams.patientId !== 'new') {
		return <FuseLoading />;
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
								to="/apps/provider/patients"
								color="inherit"
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">Patients</span>
							</Typography>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									{form.images.length > 0 && form.featuredImageId ? (
										<img
											className="w-32 sm:w-48 rounded"
											src={form.featuredImageId}
											alt="featuredImageId"
										/>
									) : (
											<img
												className="w-32 sm:w-48 rounded"
												src="assets/images/ecommerce/patient-image-placeholder.png"
												alt="patient"
											/>
										)}
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.name ? form.name : 'Patient'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">{`${form.gender}, ${form.age} years old`}</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(savePatient(form))}
							>
								Save
							</Button>
						</FuseAnimate> */}
					</div>
				)
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Profile" />
					<Tab className="h-64 normal-case" label="Exams" />
					<Tab className="h-64 normal-case" label="Appointments" />
					<Tab className="h-64 normal-case" label="Treatments" />
					<Tab className="h-64 normal-case" label="Comments" />
					<Tab className="h-64 normal-case" label="Video Library" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24">
						{tabValue === 0 && <PatientProfile patient={form} />}
						{tabValue === 1 && <PatientExams exams={form.exams} />}
						{tabValue === 2 && <PatientAppointments appointments={form.appointments} />}
						{tabValue === 3 && <PatientTreatments treatments={form.treatments} />}
						{tabValue === 4 &&

							<div>
								<div className="rounded-lg shadow-xl flex flex-col pt-16 px-16 ltr:pl-56 rtl:pr-56 pb-40 overflow-scroll" style={{ height: '50vh', background: '#24aae007', border: '1px solid #00000044' }}>
									<PatientComments dummyData={dummyData} />
									<AlwaysScrollToBottom />
								</div>
								<div style={{ marginTop: "1vh" }}>
									<FormControl className={clsx(classes.margin, classes.textField)} style={{ width: '99%' }} variant="outlined">
										<InputLabel htmlFor="outlined-adornment-password">Type your message ...</InputLabel>
										<OutlinedInput
											className="mt-8 mb-16"
											label="Extra Shipping Fee"
											id="extraShippingFee"
											name="extraShippingFee"
											onChange={(event) => setComment(event.target.value)}
											value={comment}
											variant="outlined"
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														edge="end"
														onClick={() => {
															var data = new Date();
															var newComment =
															{
																message: comment,
																date: `${data.getFullYear()}-${data.getMonth()}-${data.getDate()} ${formatAMPM(data)}`,
																user: 1
															}
															setComments([...comments, newComment])
														}}
													>
														<Icon>
															send
															</Icon>
													</IconButton>
												</InputAdornment>
											}
											fullWidth
										/>
									</FormControl>
								</div>
							</div>

						}



						{tabValue === 5 && <PatientVideoLibrary videos={form.videoLibrary} />}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('providerApp', reducer)(Patient);

const dummyData = [
	{
		message: "I want to check, the pain that i have been feeling, and ai justs don’t know what’s happening ....",
		date: "2020-01-19 08:22 pm",
		user: 1
	},
	{
		message: "I checked the new exams and they're all OK",
		date: "2020-01-20 04:30 pm",

		user: 2
	},
	{
		message: "This should be in left again",
		date: "2020-01-20 01:20 pm",

		user: 2
	},
	{
		message: "I realized that the pain are strong when i climb the stairs....",
		date: "2020-01-21 02:20 pm",
		user: 1
	},
	{
		message: "I want to check, the pain that i have been feeling, and ai justs don’t know what’s happening ....",
		date: "2020-01-23 09:20 am",

		user: 1
	},
	{
		message: "I checked the new exams and they're all OK",
		date: "2020-01-23 09:20 am",

		user: 2
	},
	{
		message: "This should be in left again",
		date: "2020-01-23 09:20 am",

		user: 2
	},
	{
		message: "I realized that the pain are strong when i climb the stairs....",
		date: "2020-01-23 09:20 am",

		user: 1
	},
	{
		message: "I want to check, the pain that i have been feeling, and ai justs don’t know what’s happening ....",
		date: "2020-01-23 09:20 am",

		user: 1
	},
	{
		message: "I checked the new exams and they're all OK",
		date: "2020-01-23 09:20 am",

		user: 2
	},
	{
		message: "This should be in left again",
		date: "2020-01-23 09:20 am",

		user: 2
	},
	{
		message: "I realized that the pain are strong when i climb the stairs....",
		date: "2020-01-23 09:20 am",

		user: 1
	}
];