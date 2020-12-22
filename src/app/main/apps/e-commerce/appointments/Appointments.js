import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import AppointmentsHeader from './AppointmentsHeader';
import AppointmentsTable from './AppointmentsTable';
import { useDispatch, useSelector } from 'react-redux';
import {appointmentsList} from '../store/appointmentsSlice'

function Appointments() {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();
	const appointments = useSelector(( {AppointmentsApp} ) => AppointmentsApp.appointments);
	
	React.useEffect(()=>{
		if(appointments.length == 0){
			dispatch(appointmentsList())
		}
	},[dispatch])
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<AppointmentsHeader/>}
			content={<AppointmentsTable appointments={appointments}/>}
			innerScroll
		/>
	);
}

export default withReducer('AppointmentsApp', reducer)(Appointments);
