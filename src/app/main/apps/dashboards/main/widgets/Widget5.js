
import { makeStyles } from '@material-ui/core/styles';
//ToDo migra table pra share component

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
import CheckIn from './CheckIn'
import AppointmentWidget from './AppointmentWidget'
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
];

var medicines = [
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

const vaccines = [
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


const emergencyContact = [

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
				</Grid>}
            {widgets.emergencyContact && <Grid item xs={12} sm={6} md={4}>
                <EmergencyContactWidget data={emergencyContact} />
            </Grid>}
            {widgets.careTeam &&
                <Grid item sm={12} md={6} lg={4}>
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