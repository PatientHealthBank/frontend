import Grid from '@material-ui/core/Grid';
import React from 'react';
import MedicinesListWidget from './widgets/medicines/MedicinesListWidget';
import NewMedicinesWidget from './widgets/medicines/NewMedicinesWidget';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import phbApi from 'app/services/phbApi'
import {listMedicines} from './store/medicinesSlice'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';


function Medicines() {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const medicines = useSelector(( {ProfilesApp} ) => ProfilesApp.medicines);


	React.useEffect(()=>{
		if(medicines.length == 0){
			dispatch(listMedicines())
		}
	},[dispatch])

	const RegisterNewMedicines = (name, dosage, frequency, refillStatus)=>{
		dispatch(openLoading())
		phbApi().post("/patient/medicine/", {Name: name, Dosage: dosage, Frequency: frequency, RefillStatus:refillStatus, patientId:user.currentUser.id}).then(res => {
			dispatch(closeLoading())
			dispatch(listMedicines())
		}).
			catch(err => {
				console.log(err);
				dispatch(closeLoading())
			})
	}

	const DeleteMedicines = (id)=>{
		dispatch(openLoading())
		phbApi().delete("/patient/medicine/"+id).then(res => {
			dispatch(listMedicines())
			console.log(res);
			dispatch(closeLoading())
		}).
			catch(err => {
				console.log(err);
				dispatch(closeLoading())
			})
	}


	return (
		<>
			<h1>Medicines</h1>
			<Grid container spacing={3} >

				<Grid item lg={8} xs={12}>
					<MedicinesListWidget medicines={medicines} deleteMedicines={DeleteMedicines} />
				</Grid>
				<Grid item lg={4} xs={12}>
					<NewMedicinesWidget registerNewMedicines={RegisterNewMedicines}  />
				</Grid>
			</Grid>
		</>
	);
}

export default withReducer('ProfilesApp', reducer)(Medicines);
