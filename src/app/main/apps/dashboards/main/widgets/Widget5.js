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
// import {appointmentsList} from '../../../e-commerce/store/appointmentSlice'

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CheckIn from './CheckIn';
import AppointmentWidget from './AppointmentWidget';
import CareTeamWidget from './CareTeamWidget';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		marginBottom: '15px'
	},
	avatar: {
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
function DoctorComp(prop) {
	return (
		<Tooltip title={prop.name} aria-label="add">
			<Avatar class={prop.classe} alt="Remy Sharp" src={prop.img} />
		</Tooltip>
	);
}
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

	const classes = useStyles(props);

	const handleDeleteContact = index => {
		setEmergency(emergency.splice(index, 1));
	};

	return (
		<Grid container spacing={2}>
			{widgets.appointments && (
				<Grid item xs={12} sm={12} md={4}>
					<Card className="w-full rounded-8 shadow-1" style={{ height: '359px' }}>
						<div className="p-16 px-4 flex flex-row items-center justify-between">
							<Typography className="h1 px-12">Appointments</Typography>

							<div>
								<IconButton aria-label="more">
									<Icon>more_vert</Icon>
								</IconButton>
							</div>
						</div>

						<div className="w-full p-8 min-h-420 h-420">
							<AppointmentWidget />
						</div>
					</Card>
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
			{widgets.testResults && (
				<Grid item xs={12} sm={6} md={4}>
					<Card className="w-full rounded-8 shadow-1">
						<div className="p-16 px-4 flex flex-row items-center justify-between">
							<Typography className="h1 px-12">Test Results</Typography>

							<div>
								<IconButton aria-label="more">
									<Icon>more_vert</Icon>
								</IconButton>
							</div>
						</div>
						<RowToComp
							class={classes}
							handleChange={handleChange}
							checked={state.checkedB}
							name="checkedB"
							status={2}
							day={2}
							description="New Intake Form Solicitation"
						></RowToComp>
						<RowToComp
							class={classes}
							handleChange={handleChange}
							checked={state.checkedC}
							name="checkedC"
							status={3}
							day={10}
							description="Physical Therapist - Exam Solicitation"
						></RowToComp>

						<RowToComp
							class={classes}
							handleChange={handleChange}
							checked={state.checkedD}
							name="checkedD"
							status={1}
							day={22}
							description="New Intake Form Solicitation"
						></RowToComp>
					</Card>
				</Grid>
			)}
		</Grid>
	);
}

export default React.memo(Widget5);
