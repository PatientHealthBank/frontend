import Grid from '@material-ui/core/Grid';
import React from 'react';
import AllergiesListWidget from './widgets/allergies/AllergiesListWidget';
import NewAllergiesWidget from './widgets/allergies/NewAllergiesWidget';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from 'app/fuse-layouts/shared-components/loadingModal/LoadingModal';
import { useTranslation } from "react-i18next";

function Allergies() {
	const { t } = useTranslation();
	const[allergies,setAllergies] =  React.useState([]);
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();
	const RegisterNewAllergies = (allergicTo, ageOfOnset, type, severity)=>{
		dispatch(openLoading())
		phbApi().post("/allergies/register", {AllergicTo: allergicTo, AgeOfOnset: parseInt(ageOfOnset), Type: type, Severity:severity, PatientId:user.uuid}).then(res => {
			dispatch(closeLoading())
			ListAllergies();
		}).
			catch(err => {
				console.log(err);
				dispatch(closeLoading())
			})
	}
	const ListAllergies = ()=>{
		dispatch(openLoading())
		phbApi().get("/allergies/list/"+user.uuid).then(res => {
			setAllergies(res.data);
			console.log(res);
			dispatch(closeLoading())
		}).
			catch(err => {
				console.log(err);
				dispatch(closeLoading())
			})
	}
	const DeleteAllergies = (id)=>{
		dispatch(openLoading())
		phbApi().delete("/allergies/delete/"+id).then(res => {
			ListAllergies();
			console.log(res);
			dispatch(closeLoading())
		}).
			catch(err => {
				console.log(err);
				dispatch(closeLoading())
			})
	}
	React.useEffect(()=>{ListAllergies()},[])

	return (
		<>
		<LoadingModal></LoadingModal>
			<h1>{t('Allergies')}</h1>
			<Grid container spacing={3} >

				<Grid item lg={8} xs={12}>
					<AllergiesListWidget allergies={allergies} deleteAllergies={DeleteAllergies} />
				</Grid>
				<Grid item lg={4} xs={12}>
					<NewAllergiesWidget registerNewAllergies={RegisterNewAllergies} />
				</Grid>
			</Grid>
		</>
	);
}

export default  React.memo(Allergies);