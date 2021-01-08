import { makeStyles } from '@material-ui/core/styles';
//ToDo migra table pra share component

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
import FamilyMembersWidget from './FamilyMembersWidget';
import CareTeamWidget from './CareTeamWidget';
import AppointmentTestWidget from './AppointmentTestWidget';
import AppointmentWidget from './AppointmentWidget';

const appointmentTest = [];

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		marginBottom: '15px'
	},
	avatar: {
		height: '192px',
		width: '192px',
		margin: '10px'
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
function RowToComp(prop) {
	return (
		<div className="flex flex-row">
			<div className="w-3/12  p-8 max-h-420 min-h-420 h-420" style={{ marginLeft: '4%' }}>
				{prop.status === 1 ? (
					<div
						className="text-center"
						style={{ backgroundColor: '#E1F0FF', color: '#0A6CC1', padding: '3%', borderRadius: '100px' }}
					>
						<strong>Ready</strong>
					</div>
				) : (
					<div
						className="text-center"
						style={{ backgroundColor: '#FFE2E5', color: '#F74E8B', padding: '3%', borderRadius: '100px' }}
					>
						<strong>Waiting</strong>
					</div>
				)}
			</div>
			<div className="w-7/12 p-8 min-h-420 h-420">
				<div className="text-right font-bold text-base">
					<span>{prop.description}</span>
				</div>
			</div>
			<div className={'w-1/12 p-8 min-h-420 h-420 align-top ' + prop.class.myTestsResults}>
				{prop.status === 1 && (
					<IconButton>
						<Icon>remove_red_eye</Icon>
					</IconButton>
				)}
			</div>
		</div>
	);
}

const emergencyContact = [];

function Widget5(props) {
	const [state, setState] = React.useState({
		checkedA: false,
		checkedB: false,
		checkedF: false,
		checkedG: false
	});
	var { widgets } = props;
	const [emergency, setEmergency] = React.useState(emergencyContact);

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	console.log(widgets);
	console.log(widgets);
	console.log(widgets);

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

			<Grid item xs={12} sm={6} md={4}>
				<FamilyMembersWidget />
			</Grid>
		</Grid>
	);
}

export default React.memo(Widget5);
