import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Title from './Title'
import Calendar from 'react-calendar';
import './Calendar.css';
import ConfirmAlert from './ConfirmAlert'
import AlertDialog from './AlertDialog'
import React, { useState } from 'react';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { useDispatch } from 'react-redux';


function Widget5(props) {
	const { clinic, doctor, hour, day, user, specialties} = props
	const [open,setOpen] = useState(false);
	const [appointmentSpecialty,setAppointmentSpecialty] = useState('');
	const [appointmentType,setAppointmentType] = useState('First appointment');


	var date = new Date(`${day} ${hour}`)
	const SaveAppointment = ()=>{
		var params = {
			ClinicId: clinic.id,
			ProviderId: doctor.id,
			SpecialtyId: Number.parseInt(appointmentSpecialty) || Number.parseInt(specialties[0].id),
			PatientId: user.currentUser.id,
			ScheduleDate: date,
			AppointmentType: appointmentType
		}
		phbApi().post("appointment/", params).then(res=>{
			console.log(res)
		})
	}

	return (
		<div className="w-full">
			<div className="w-full" style={{display:"inline-flex", marginBottom:"10px"}}>
			<Paper className="w-full rounded-8 shadow-1">
				<div className="flex flex-row">
					<div className="w-full md:w-2/12 p-8 min-h-420 h-420">
						
						<div style={{textAlign:'center', verticalAlign:"middle"}}>
							<img src="assets/images/avatars/doctor-male.png" style={{    display: 'block',marginLeft: 'auto',
								marginRight: 'auto',
								width: '50%',
								alignSelf: 'center',
								marginBottom: '10px'}} alt="Logo"/>
					<div style={{display:"inline-flex", color:'green'}}></div></div>
					</div>
					<div className="flex w-full md:w-6/12 flex-wrap p-8">
						<div>
						<Title>Provider</Title>	
						<div>
							{doctor.name}
						</div>
						<Title>Specialty</Title>	
						<div>
						{specialties.length > 0 && (<Select
							native
							value={appointmentSpecialty}
							onChange={event=> setAppointmentSpecialty(event.target.value)}
							inputProps={{
							}}>
								{specialties.map(specialty =>
									<option value={specialty.id}>{specialty.description}</option>
									)}
						</Select>)}
						</div>
						<Title>Clinic</Title>	
						<div>
							{clinic.companyName}
						</div>
						<Title>Address</Title>	
						<div>
						<Icon>location_on</Icon>{clinic.address.addressLine1}
						</div>
						<Title>Patient</Title>	
						<div>
							{user.currentUser.displayName}
						</div>
						<Title>Type of appointment</Title>	
						<div>
						<Select
							native
							value={appointmentType}
							onChange={event=> setAppointmentType(event.target.value)}
							inputProps={{
							}}>
							<option value={'First appointment'}>First appointment</option>
							<option value={'Follow up'}>Follow up</option>
							<option value={'Annual visit'}>Annual visit</option>
							<option value={'Other'}>Other</option>
						</Select>
						</div>
						<Title>Selected Time</Title>	
						<div>
						{`${date.toGMTString().replace("GMT", "")}`}
						</div>
						</div>
					</div>
					<div className="flex w-full md:w-4/12 flex-wrap p-8">
					<Calendar
						tileDisabled ={()=>false}
						maxDate={date}
						minDate={date}
						value={date}
						/>
					</div>
				</div>
				<div className="flex flex-row-reverse" style={{marginRight:'7em'}}> 
					<div className="float-right">
						<Button onClick={()=>SaveAppointment()}  variant="contained" color="secondary">
							Confirm
						</Button>
					</div>
				</div>
				<div className="flex flex-row" style={{marginTop:'1px'}}> 
						<ConfirmAlert></ConfirmAlert>
						<AlertDialog open={open} setOpen={setOpen}></AlertDialog>

				</div>

			</Paper>

			<br/>

			</div>
		</div>
	);
}

export default React.memo(Widget5);