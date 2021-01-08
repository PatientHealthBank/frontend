import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from '../store';
import {getAppointment,updateAppointment, newAppointment} from '../store/appointmentSlice';
import Avatar from '@material-ui/core/Avatar';
import AppointmentTab from './tabs/AppointmentTab';
import AppointmentTestResults from './tabs/AppointmentTestResults';
import AppointmentTopics from './tabs/AppointmentTopics';
import AppointmentPreparation from './tabs/AppointmentPreparation';
import AppointmentCheckList from './tabs/AppointmentCheckList';
import { getLabels } from 'app/main/apps/my-diary/store/labelsSlice';
import { getNotes } from 'app/main/apps/my-diary/store/notesSlice';


const useStyles = makeStyles(theme => ({
	typeIcon: {	
		'&.TXT:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.PDF:before': {
			content: "'picture_as_pdf'",
			color: '#F44336'
		},
		'&.DOCX:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},	
		'&.XLS:before': {
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
	appointmentImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	appointmentImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	appointmentImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $appointmentImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $appointmentImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $appointmentImageFeaturedStar': {
				opacity: 1
			}
		}
	},
	avatarMain: {
		width: theme.spacing(5),
		height: theme.spacing(5),
		marginLeft: '5px'
	},
	checkListItem: {
		'&.completed': {
			background: 'rgba(0,0,0,0.03)',
			'& .todo-title, & .todo-notes': {
				textDecoration: 'line-through'
			}
		}
	}
}));


function Appointment(props) {
	const dispatch = useDispatch();
	const appointment = useSelector(({ AppointmentsApp }) => AppointmentsApp.appointment);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [open, setOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState([]);
	const [dialogTitle, setDialogTitle] = useState("Title");
	const { form, handleChange, setForm } = useForm(null);
	const [specialtyDescription, setSpecialty] = React.useState("Specialty")
	const routeParams = useParams();

	useEffect(() => {
		dispatch(getNotes());
		dispatch(getLabels());
	}, [dispatch]);

	useDeepCompareEffect(() => {
		function updateAppointmentState() {
			const { appointmentId } = routeParams;
			
			if (appointmentId === 'new') {
				dispatch(newAppointment());
			} else {
				dispatch(getAppointment(routeParams));
			}
		}
		updateAppointmentState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((appointment && !form) || (appointment && form && appointment.id !== form.id)) {
			setForm(appointment);
		}
	}, [form, appointment, setForm]);

	useEffect(() => {
		if (form && form.specialty && specialtyDescription === "Specialty") {
			setSpecialty(form.specialtyDescription)
		}
		if (form && form.meansTransport) {
			switch (form.meansTransport) {
				case 'Uber':
					setDialogTitle('Uber');
					setDialogContent("This will generate a reminder/notification for you 2 hours before your appointment."
						+ "This option doesn't book an Uber for you."
						+ "Please use the link to go to Uber app or website");
					setOpen(true);
					break;
				case 'Taxi':
					setDialogTitle('Taxi');
					setDialogContent('');
					setOpen(true);
					break;
				case 'Caregiver':
					setDialogTitle('Caregiver');
					setDialogContent('');
					setOpen(true);
					break;
			}
		}
	}, [form,specialtyDescription])

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function canBeSubmitted() {
		return (form.clinic || routeParams.appointmentId == 'new') && !_.isEqual(appointment, form);
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
								to="/appointments"
								color="inherit"
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">Appointments</span>
							</Typography>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									{form.provider?.imageUrl == null && form.provider?.imageUrl == ""?(
										<Avatar className="md:mx-4" alt="user photo" src={form.provider?.imageUrl} />
									) : (
											<Avatar className={classes.avatarMain} >{form.provider?.name[0]}</Avatar>
										)}
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{/* {form.doctorName ? form.doctorName : 'New Appointment'} */}
											{/* {props.handle.provider.name} */}
											{form.provider?.name}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">{form.specialty?.description}</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(updateAppointment(form))}
							>
								Save
							</Button>
						</FuseAnimate>
					</div>
				)
			}
			contentToolbar={
				<div>{routeParams.appointmentId != 'new' && (<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Appointment" />
					
					<Tab className="h-64 normal-case" label="Your Check List" />
					<Tab className="h-64 normal-case" label="Test Results" />
					<Tab className="h-64 normal-case" label="Preparation for Your Appointment" />
					<Tab className="h-64 normal-case" label="Topics for Discussion" />
					
				</Tabs>)}
				</div>
			}
			content={
				(form && (routeParams.appointmentId == "new" || form.specialty)) ? (
					<div className="p-16 sm:p-24">
						{tabValue === 0 && <AppointmentTab appointment={form} type={routeParams.appointmentId} handleChange={handleChange}/>}
						{tabValue === 1 && (
							<div>
								<AppointmentCheckList appointmentCheckList={form.appointmentCheckList} setForm={setForm} handleChange={handleChange} classes={classes} />
							</div>
						)}
						{tabValue === 2 && <AppointmentTestResults appointmentId={form.id}/>}
						{tabValue === 3 && <AppointmentPreparation preparation ={form}/>}
						{tabValue === 4 && <AppointmentTopics topics={form} setForm={setForm} handleChange={handleChange}/>}
					</div>
				) : (<FuseLoading></FuseLoading>)
			}
			innerScroll
		/>
	);

}

// export default withRouter(withReducer('eCommerceApp', reducer))(Appointment);
export default withReducer('AppointmentsApp', reducer)(Appointment);