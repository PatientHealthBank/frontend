import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AllergiesWidget from 'app/main/pages/profile/widgets/AllergiesWidget';
import MedicinesWidget from 'app/main/pages/profile/widgets/MedicinesWidget';
import Card from '@material-ui/core/Card';
import StrengthWidget from 'app/main/pages/profile/widgets/StrengthWidget';
import VaccinesTakenWidget from 'app/main/pages/profile/widgets/ImmunizationWidget';
import EmergencyContactWidget from 'app/main/pages/profile/widgets/EmergencyContactWidget';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentWidget from './AppointmentWidget';
import CheckIn from './CheckIn';
import MedicalHistoryWidget from './MedicalHistoryWidget';
import CareTeamWidget from './CareTeamWidget';
import AppointmentTestWidget from './AppointmentTestWidget';
import FamilyMembersWidget from './FamilyMembersWidget';

const appointmentTest = [];

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		marginBottom: '15px'
	},
	avatar: {
		height: '128px',
		width: '128px',
		marginTop: '7%',
		marginLeft: '5%',
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex'
	},
	table: {
		'& tr': {
			'& th, td': {
				paddingLeft: '10px',
				paddingRight: '10px',
				textAlign: 'center',
				paddingBottom: '10px'
			}
		}
	},
	reactCalendar: {
		'& abbr': {
			textDecoration: 'none',
			width: '24px',
			height: '24px',
			borderRadius: '50%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}
	},
	myTestsResults: {
		'& .MuiIconButton-root': {
			padding: '0'
		}
	}
}));

const emergencyContact = [];

function DashboardWidget(props) {
	const [state, setState] = React.useState({
		checkedA: false,
		checkedB: false,
		checkedF: false,
		checkedG: false
	});
	const { widgets } = props;
	const [emergency, setEmergency] = React.useState(emergencyContact);

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const classes = useStyles(props);

	const handleDeleteContact = index => {
		setEmergency(emergency.splice(index, 1));
	};

	return (
		<Grid container spacing={2}>
			{widgets.appointments && (
				<Grid item xs={12} sm={12} md={4}>
					<AppointmentWidget />
				</Grid>
			)}
			{widgets.emergencyContact && (
				<Grid item xs={12} sm={6} md={4}>
					<EmergencyContactWidget data={emergencyContact} />
				</Grid>
			)}
			{widgets.careTeam && (
				<Grid item sm={12} md={6} lg={4}>
					<CareTeamWidget classes={classes} />
				</Grid>
			)}
			{widgets.allergies && (
				<Grid item xs={12} sm={6} md={4}>
					<AllergiesWidget />
				</Grid>
			)}
			{widgets.strength && (
				<Grid item xs={12} sm={6} md={4}>
					<StrengthWidget />
				</Grid>
			)}
			{widgets.vaccines && (
				<Grid item xs={12} sm={6} md={4}>
					<VaccinesTakenWidget />
				</Grid>
			)}
			{widgets.medicalHistory && (
				<Grid item sm={12} md={6} lg={4}>
					<MedicalHistoryWidget />
				</Grid>
			)}
			{widgets.medicines && (
				<Grid item xs={12} sm={6} md={4}>
					<MedicinesWidget />
				</Grid>
			)}
			{widgets.appointmentTest && (
				<Grid item xs={12} sm={6} md={4}>
					<AppointmentTestWidget data={appointmentTest} />
				</Grid>
			)}
			{widgets.familyMembers && (
				<Grid item xs={12} sm={6} md={4}>
					<FamilyMembersWidget />
				</Grid>
			)}
		</Grid>
	);
}

export default React.memo(DashboardWidget);
