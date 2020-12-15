import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import TableCalendar from './TableCalendar'

import _ from '../../dashboard/node_modules/@lodash';
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

const useStyles = makeStyles(theme => ({
		table:{
			margin:"15px",
				'& tr': {
					'& th, td': {
						paddingLeft: '10px',
						paddingRight: '10px',
						textAlign:"center",
						paddingBottom: '10px',
			
		
				}
		}

	}
}));

function Widget5(props) {
	const [currentRange, setCurrentRange] = useState('TW');
	const theme = useTheme();
	const {clinic} = props;
	const classes = useStyles(props);

	function handleChangeRange(range) {
		setCurrentRange(range);
	}

	return (
		<div className="w-full">
		{(clinic.doctors.map(x=>(
			<div className="w-full" style={{display:"inline-flex", marginBottom:"10px"}}>
			<Paper className="w-full md:w-1/2 rounded-8 shadow-1">
				<div className="flex items-center justify-between px-16 py-16 border-b-1">
					<div style={{fontSize:'19px'}}><strong>{x.name}</strong></div>
					<div className="items-center">
						
					</div>
				</div>
				<div className="flex flex-row">
					<div className="w-full md:w-3/12 p-8 min-h-420 h-420">
						
						<div style={{textAlign:'center', verticalAlign:"middle"}}>
						{x.gender == "m" ? 
							(<img src="assets/images/avatars/doctor-male.png" style={{    display: 'block',marginLeft: 'auto',
								marginRight: 'auto',
								width: '50%',
								alignSelf: 'center',
								marginBottom: '10px'}} alt="Logo"/>):
								(<img src="assets/images/avatars/doctor-female.png" style={{    display: 'block',marginLeft: 'auto',
								marginRight: 'auto',
								width: '50%',
								alignSelf: 'center',
								marginBottom: '10px'}} alt="Logo"/>)
						}
			
					<div style={{display:"inline-flex", color:'green'}}>	<Icon>camera_alt</Icon>	<div style={{marginLeft:'10px'}}>Telemedicine</div></div></div>
					</div>
					<div className="flex w-full md:w-7/12 flex-wrap p-8">
						<div>
		<div style={{fontSize:'revert', paddingTop:"5px", paddingBottom:'5px'}}>{x.description}</div>	
		<img src="assets/images/stars/2stars.png" alt="Logo"/>
						</div>
					</div>
				</div>
			</Paper>
			<Paper className="w-full md:w-1/2 rounded-8 shadow-1">
				<div className="flex flex-row">
					<div className="w-full p-8 min-h-420 h-420" style={{textAlign: '-webkit-center'}} >
						<TableCalendar data={x.data} doctorId={x.id} clinicId={clinic.id}></TableCalendar>
					</div>
				</div>
			</Paper>
			<br/>
			</div>

		))	)}
		</div>
	);
}

export default React.memo(Widget5);