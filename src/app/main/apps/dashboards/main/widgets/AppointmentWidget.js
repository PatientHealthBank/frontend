
import React, { component } from 'react'
import withReducer from 'app/store/withReducer';
import reducer from '../store'
function  appointmentWidget(props){

}


export default withReducer('AppointmentsApp', reducer)(appointmentWidget);
// const rows = [
// 	createData('Henry', 'Physical Therapist - Knee', new Date("12/03/2020 11:00")),
// 	createData('Sam', 'Sports Medicine', new Date("12/05/2020 11:00")),
// 	createData('Henry', 'Physical Therapis', new Date("11/07/2020 11:00")),
// 	createData('Sam', 'Sports Medicine', new Date("11/13/2020 11:00")),
// 	createData('Henry', 'Physical Therapis', new Date("11/16/2020 11:00")),
// 	createData('Sam', 'Sports Medicine', new Date("11/18/2020 11:00")),

// ];
