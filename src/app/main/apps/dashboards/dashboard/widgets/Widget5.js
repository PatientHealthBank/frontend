
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CheckIn from './CheckIn'
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';

const useStyles = makeStyles(theme => ({
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
		<div class="p-20 m-10" style={{ borderLeft: "solid 1px #00000026", borderRight: "solid 1px #00000026" }}>
			<div className="flex flex-col">

				<Avatar style={{ alignSelf: 'center' }} alt="Remy Sharp" src={prop.img} />
				<div className="text-left font-bold text-lg"><span>{prop.name}</span>

				</div>
				<div className="text-left text-base"> {prop.specialty}</div>
			</div>
		</div>)
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
	createData('Henry', 'Physiotherapy - Knee', 'Aug 20, 2020 - 04:30 PM'),
	createData('Sam', 'Dermatologist', 'Aug 20, 2020 - 08:30 PM'),
];


function Widget5(props) {
	const [state, setState] = React.useState({
		checkedA: false,
		checkedB: false,
		checkedF: false,
		checkedG: false,
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const classes = useStyles(props);



	return (
		<div className="w-full">
			<Paper className="w-full rounded-8 shadow-xl mb-20">
				<div className="flex flex-row" style={{ borderBottom: '1px solid #00000026', margin: "0 2%" }}>
					<div className="w-full  p-8 min-h-620 h-420 text-center ">
						<h2><strong>My Care Team</strong></h2>
					</div>
				</div>
				<div className="flex flex-column">
					<DoctorComp img={"assets\\images\\avatars\\doctor1.png"} name="Samanta Nole" specialty="Physiotherapist"></DoctorComp>
					<DoctorComp img={"assets\\images\\avatars\\doctor1.png"} name="Sam Smith" specialty="Orthopedist"></DoctorComp>
					<DoctorComp img={"assets\\images\\avatars\\doctor3.jpg"} name="Hanna Tunner" specialty="Primary Care"></DoctorComp>
					<DoctorComp img={"assets\\images\\avatars\\doctor3.jpg"} name="Julien Brand" specialty="Otolaryngologist"></DoctorComp>
				</div>
			</Paper>
			<div className="w-full" style={{ display: "inline-flex", marginBottom: "10px" }}>
				<Paper className="w-full md:w-6/12 rounded-8 shadow-xl mr-12">
					<div className="flex flex-row" style={{ borderBottom: '1px solid #00000026', margin: "2%" }}>
						<div className="w-full  p-8 min-h-620 h-420" style={{ paddingLeft: "20px" }}>
							<h2><strong>Upcoming Appointments</strong></h2>
						</div>
					</div>
					<div className="flex flex-row">
						<div className="w-full p-8 min-h-420 h-420">
							<TableContainer component={Paper}>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell></TableCell>
											<TableCell align="center">Appointments</TableCell>
											<TableCell align="center">Actions</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.map((row) => (
											<TableRow key={row.name}>
												<TableCell align="center"><Avatar src="assets/images/avatars/doctor-male.png" alt="Logo" /></TableCell>
												<TableCell align="center">{row.specialty}<br /> {row.date}</TableCell>
												<TableCell align="center"><CheckIn specialty={row.specialty} date={row.date} /></TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</div>

				</Paper>
				<Paper className="w-full md:w-6/12 rounded-8 shadow-xl mr-12">
					<div className="flex flex-row" style={{ borderBottom: '1px solid #00000026', margin: "2%" }}>
						<div className="w-full  p-8 min-h-620 h-420" style={{ paddingLeft: "20px" }}>
							<h2><strong>Past Appointments</strong></h2>
						</div>
					</div>
					<div className="flex flex-row">
						<div className="w-full p-8 min-h-420 h-420">
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell></TableCell>
											<TableCell align="center">Doctor</TableCell>
											<TableCell align="center">Appointments</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.map((row) => (
											<TableRow key={row.name}>
												<TableCell align="center"><Avatar src="assets/images/avatars/doctor-male.png" alt="Logo" /></TableCell>
												<TableCell align="right">Juan Gomes</TableCell>
												<TableCell align="center">{row.specialty}<br /> {row.date}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</div>

				</Paper>
			</div>
			<div className="w-full" style={{ display: "inline-flex", marginBottom: "10px" }}>
				<Paper className="w-full md:w-4/12 rounded-8 shadow-xl mr-12">
					<div className="flex flex-row" style={{ borderBottom: '1px solid #00000026', margin: "2%" }}>
						<div className="w-full  p-8 min-h-620 h-420" style={{ paddingLeft: "20px" }}>
							<h2><strong>My Tests Results</strong></h2>
						</div>
					</div>
					<RowToComp class={classes} handleChange={handleChange} checked={state.checkedB} name="checkedB" status={2} day={2} description="New IntakeForm Solicitation"></RowToComp>
					<RowToComp class={classes} handleChange={handleChange} checked={state.checkedC} name="checkedC" status={3} day={10} description="Physiotherapy  Exam Solicitation"></RowToComp>

					<RowToComp class={classes} handleChange={handleChange} checked={state.checkedD} name="checkedD" status={1} day={22} description="New IntakeForm Solicitation"></RowToComp>



				</Paper>


				<br />

			</div>
		</div>
	);
}

export default React.memo(Widget5);