import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import PatientsHeader from './PatientsHeader';
import PatientsTable from './PatientsTable';
import {patientList} from '../store/patientsSlice';
import { useDispatch, useSelector } from 'react-redux';

function Patients() {
	const patients = useSelector(( {PatientsApp} ) => PatientsApp.patients);
	const dispatch = useDispatch();
	React.useEffect(()=>{
		if(patients.length == 0){
			dispatch(patientList())
		}
	},[dispatch]);

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<PatientsHeader />}
			content={<PatientsTable patients={patients} />}
			innerScroll
		/>
	);
}

export default withReducer('PatientsApp', reducer)(Patients);