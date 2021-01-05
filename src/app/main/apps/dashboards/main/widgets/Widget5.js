
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import AllergiesWidget from 'app/main/pages/profile/widgets/AllergiesWidget';
import MedicinesWidget from 'app/main/pages/profile/widgets/MedicinesWidget';
import Card from '@material-ui/core/Card';
import StrengthWidget from 'app/main/pages/profile/widgets/StrengthWidget';
import VaccinesTakenWidget from 'app/main/pages/profile/widgets/ImmunizationWidget';
import TableRow from '@material-ui/core/TableRow';
// import {appointmentsList} from '../../../e-commerce/store/appointmentSlice'

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CheckIn from './CheckIn'
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// const appointments = useSelector(( {AppointmentsApp} ) => AppointmentsApp.appointments);
	
// React.useEffect(()=>{

// 	if(appointments.length == 0){
// 		dispatch(appointmentsList())
// 	}
// },[dispatch]);
var allergies = [
	{
		id: '1',
		description: 'Amoxicillin',
		type: 'Drugs Allergy',
		severity: 'Severe'
	},
	{
		id: '2',
		description: 'Penicillin',
		type: 'Drugs Allergy',
		severity: 'Moderate'
	},
	{
		id: '3',
		description: 'Milk',
		type: 'Food Allergy',
		severity: 'Mild'
	},
	{
		id: '4',
		description: 'Peanuts',
		type: 'Food Allergy',
		severity: 'Severe'
	}
];

var medicines = [
	{
		id: '1',
		description: 'Ventolin HFA',
		quantity: '2 Times a day',
		RefillStatus: "Yes"
	},
	{
		id: '2',
		description: 'Nexium',
		quantity: '1 Pill',
		RefillStatus: "Yes"
	}
];


var strength = {
	id: 'widget7',
	labels: ['Complate', 'Incomplete'],
	datasets: {
		Today: [
			{
				data: [74.0, 26.0],
				change: [-0.6, 0.7]
			}
		],
		Yesterday: [
			{
				data: [77.2, 8.4],
				change: [-2.3, 0.3]
			}
		],
		'Last 7 days': [
			{
				data: [88.2, 9.2],
				change: [1.9, -0.4]
			}
		],
		'Last 28 days': [
			{
				data: [65.2, 2.6],
				change: [-12.6, -0.7]
			}
		],
		'Last 90 days': [
			{
				data: [93.5, 4.2],
				change: [2.6, -0.7]
			}
		]
	},
	options: {
		cutoutPercentage: 75,
		spanGaps: false,
		legend: {
			display: false
		},
		maintainAspectRatio: false
	}
};

const takenVaccines = [
	{
		id: '1',
		description: 'Hepatitis B',
		date: '10/02/2016',
		location: 'Brazil'
	},
	{
		id: '2',
		description: 'Yellow Fever',
		date: '10/05/2012',
		location: 'Brazil'
	},
	{
		id: '3',
		description: 'Diphtheria',
		date: '24/08/2017',
		location: 'Brazil'
	},
	{
		id: '4',
		description: 'Tetanus',
		date: '13/06/2010',
		location: 'Brazil'
	}
];
const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		marginBottom: "15px"
	},
	avatar: {
		margin: "10px"
	},
	table: {
		'& tr': {
			'& th, td': {
				paddingLeft: '10px',
				paddingRight: '10px',
				textAlign: "center",
				paddingBottom: '10px',
			}
		}

	},
	reactCalendar: {
		"& abbr": {
			textDecoration: "none",
			width: "24px",
			height: "24px",
			borderRadius: "50%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		},
	},
	myTestsResults: {
		"& .MuiIconButton-root": {
			padding: "0"
		}
	}

}));
function DoctorComp(prop) {
	return (
		<Tooltip title={prop.name} aria-label="add">
			<Avatar class={prop.classe} alt="Remy Sharp" src={prop.img} />
		</Tooltip>)
}
function RowToComp(prop) {
	return (
		<div className="flex flex-row">
			<div className="w-3/12  p-8 max-h-420 min-h-420 h-420" style={{ marginLeft: '4%' }}>
				{prop.status === 1 ?
					(<div className="text-center"
						style={{ backgroundColor: "#E1F0FF", color: "#0A6CC1", padding: '3%', borderRadius: "100px" }}><strong>Ready</strong></div>) :
					(
						<div className="text-center"
							style={{ backgroundColor: "#FFE2E5", color: "#F74E8B", padding: '3%', borderRadius: "100px" }}><strong>Waiting</strong></div>)}
			</div>
			<div className="w-7/12 p-8 min-h-420 h-420">
				<div className="text-right font-bold text-base"><span>{prop.description}</span>

				</div>
			</div>
			<div className={"w-1/12 p-8 min-h-420 h-420 align-top " + prop.class.myTestsResults} >
				{prop.status === 1 && (<IconButton><Icon>remove_red_eye</Icon></IconButton>)}
			</div>
		</div>)
}

function createData(name, specialty, date) {
	return { name, specialty, date };
}

const rows = [
	createData('Henry', 'Physical Therapist - Knee', new Date("12/03/2020 11:00")),
	createData('Sam', 'Sports Medicine', new Date("12/05/2020 11:00")),
	createData('Henry', 'Physical Therapis', new Date("11/07/2020 11:00")),
	createData('Sam', 'Sports Medicine', new Date("11/13/2020 11:00")),
	createData('Henry', 'Physical Therapis', new Date("11/16/2020 11:00")),
	createData('Sam', 'Sports Medicine', new Date("11/18/2020 11:00")),

];
function createContact(name, phone, kinship, email) {
	return { name, phone, kinship, email }
}
const emergencyContact = [
	createContact("Ayse Correa", "+1-202-555-0196", "Parent", "ayse.correa@patienthealthbank.com"),
	createContact("Alessandro Simmonds", "+1-202-555-0128", "Parent", "alessandro.simmonds@patienthealthbank.com")
];


function Widget5(props) {
	const [state, setState] = React.useState({
		checkedA: false,
		checkedB: false,
		checkedF: false,
		checkedG: false,
	});
	var { widgets } = props
	const [emergency, setEmergency] = React.useState(emergencyContact);

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	}


	const classes = useStyles(props);

	const handleDeleteContact = (index) => {
		setEmergency(emergency.splice(index, 1));
	};




	return (
		<Grid container spacing={2}>
			{widgets.appointments &&
				<Grid item xs={12} sm={12} md={4}>
					<Card className="w-full rounded-8 shadow-1" style={{height:'359px'}}>
						<div className="p-16 px-4 flex flex-row items-center justify-between">
							<Typography className="h1 px-12">Appointments</Typography>

							<div>
								<IconButton aria-label="more">
									<Icon>more_vert</Icon>
								</IconButton>
							</div>
						</div>

						<div className="w-full p-8 min-h-420 h-420">
							<TableContainer style={{height:'278px'}}>
								<Table aria-label="simple table sticky-table" >
									<TableHead>
										<TableRow>
											<TableCell align="center">Appointments</TableCell>
											<TableCell align="center">Actions</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.sort((a, b) => b.date.getDate() - a.date.getDate())
											.slice(0, 4)
											.map((row) => (
												<TableRow key={row.name}>
													<TableCell align="center">{row.specialty}<br /> {row.date.toGMTString()}</TableCell>
													<TableCell align="center">{row.date.getDate() > 8 ? <CheckIn specialty={row.specialty} date={row.date.toGMTString()} /> : "Done"}</TableCell>
												</TableRow>
											))}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</Card>
				</Grid>}
			{(widgets.careTeam || widgets.emergencyContact) &&
				<Grid item xs={12} sm={12} md={8}>
					<Grid container spacing={2}>
					{widgets.emergencyContact &&
							<Grid item sm={12} md={6}>
								<Card className="w-full rounded-8 shadow-1 " style={{height:'359px'}}>
									<div className="p-16 px-4 flex flex-row items-center justify-between">
										<Typography className="h1 px-12">Emergency Contact</Typography>

										<div>
											<IconButton aria-label="more">
												<Icon>more_vert</Icon>
											</IconButton>
										</div>
									</div>
									<div className="overflow-scroll" style={{height:'278px'}}>
									<Table aria-label="simple table sticky-table">
										<TableHead>
											<TableRow>
												<TableCell align="left">Name</TableCell>
												<TableCell align="left">Phone</TableCell>
												<TableCell align="left">Email</TableCell>

												<TableCell align="left">Kinship</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{emergencyContact.map((row, index) => (
												<TableRow key={index}>
													<TableCell align="left">{row.name}</TableCell>
													<TableCell align="left" style={{whiteSpace:"nowrap"}}>{row.phone}</TableCell>
													<TableCell align="left">{row.email}</TableCell>

													<TableCell align="left">{row.kinship}</TableCell>
													{/* <TableCell align="left"><IconButton onClick={() => handleDeleteContact(index)}><DeleteIcon /></IconButton > </TableCell> */}
												</TableRow>
											))}
										</TableBody>
									</Table>
									</div>
								</Card>
							</Grid>}
						{widgets.careTeam &&
							<Grid item sm={12} md={7} lg={6}>
								<Card className="w-full rounded-8 shadow-1">
									<div className="p-16 px-4 flex flex-row items-center justify-between">
										<Typography className="h1 px-12">Care Team</Typography>

										<div>
											<IconButton aria-label="more">
												<Icon>more_vert</Icon>
											</IconButton>
										</div>
									</div>
									<AvatarGroup max={5} >
										<DoctorComp img={"assets\\images\\avatars\\Nancy.jpg"} classe={classes.avatar} name="Samanta Nole" specialty="Physical Therapist"></DoctorComp>
										<DoctorComp img={"assets\\images\\avatars\\Shepard.jpg"} classe={classes.avatar} name="Sam Smith" specialty="Sports Medicine"></DoctorComp>
										<DoctorComp img={"assets\\images\\avatars\\vincent.jpg"} classe={classes.avatar} name="Sam Tunner" specialty="Sports Medicine"></DoctorComp>
										<DoctorComp img={"assets\\images\\avatars\\Helen.jpg"} classe={classes.avatar} name="Hanna Smith" specialty="Sports Medicine"></DoctorComp>
										<DoctorComp img={"assets\\images\\avatars\\doctor1.png"} classe={classes.avatar} name="Sam Smith" specialty="Sports Medicine"></DoctorComp>
										<DoctorComp img={"assets\\images\\avatars\\doctor3.jpg"} classe={classes.avatar} name="Hanna Tunner" specialty="Sports Medicine"></DoctorComp>
									</AvatarGroup>

								</Card>
							</Grid>}

					

					</Grid>
				</Grid>}
			{widgets.allergies && <Grid item xs={12} sm={6} md={4}>
				<AllergiesWidget data={allergies} />
			</Grid>}
			{widgets.strength && <Grid item xs={12} sm={6} md={4}>
				<StrengthWidget data={strength} />
			</Grid>}
			{widgets.vaccines && <Grid item xs={12} sm={6} md={4}>
				<VaccinesTakenWidget data={takenVaccines} />
			</Grid>}
			{widgets.medicines && <Grid item xs={12} sm={6} md={4}>
				<MedicinesWidget data={medicines} />
			</Grid>}
			{widgets.testResults && <Grid item xs={12} sm={6} md={4}>
				<Card className="w-full rounded-8 shadow-1">
					<div className="p-16 px-4 flex flex-row items-center justify-between">
						<Typography className="h1 px-12">Test Results</Typography>

						<div>
							<IconButton aria-label="more">
								<Icon>more_vert</Icon>
							</IconButton>
						</div>
					</div>
					<RowToComp class={classes} handleChange={handleChange} checked={state.checkedB} name="checkedB" status={2} day={2} description="New Intake Form Solicitation"></RowToComp>
					<RowToComp class={classes} handleChange={handleChange} checked={state.checkedC} name="checkedC" status={3} day={10} description="Physical Therapist - Exam Solicitation"></RowToComp>

					<RowToComp class={classes} handleChange={handleChange} checked={state.checkedD} name="checkedD" status={1} day={22} description="New Intake Form Solicitation"></RowToComp>



				</Card>
			</Grid>}
		</Grid>
	);
}

export default React.memo(Widget5);