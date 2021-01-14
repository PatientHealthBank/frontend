import React from 'react';
import ImmunizationListWidget from '../../shared/widgets/vaccines/ImmunizationListWidget';
import NewImmunizationWidget from '../../shared/widgets/vaccines/NewImmunizationWidget';
import Grid from '@material-ui/core/Grid';
import phbApi from 'app/services/phbApi';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { listVaccines } from '../../shared/store/vaccinesSlice';

function Vaccines() {
	const { t } = useTranslation();
	const user = useSelector(({ auth }) => auth.user);

	const dispatch = useDispatch();
	const vaccines = useSelector(({ ProfilesApp }) => ProfilesApp.vaccines);

	React.useEffect(() => {
		if (vaccines.length == 0) {
			dispatch(listVaccines());
		}
	}, [dispatch]);

	const RegisterNewImmunization = (description, date, location) => {
		dispatch(openLoading());
		phbApi()
			.post('/patient/immunization/', {
				Description: description,
				Date: date,
				Location: location,
				PatientId: user.currentUser.id
			})
			.then(res => {
				dispatch(closeLoading());
				dispatch(listVaccines());
			})
			.catch(err => {
				console.log(err);
				dispatch(closeLoading());
			});
	};
	const DeleteImmunization = id => {
		dispatch(openLoading());
		phbApi()
			.delete('/patient/immunization/' + id)
			.then(res => {
				dispatch(listVaccines());
				console.log(res);
				dispatch(closeLoading());
			})
			.catch(err => {
				console.log(err);
				dispatch(closeLoading());
			});
	};

	return (
		<>
			<div className="flex-1 lg:px-12">
				<h1>{t('My Vaccines')}</h1>
			</div>

			<Grid container spacing={3}>
				{/* <Grid item xs={8}>
					<VaccinesListWidget widget={vaccines} />
				</Grid> */}
				<Grid item xs={8}>
					<ImmunizationListWidget immunizations={vaccines} deleteImmunization={DeleteImmunization} />
				</Grid>
				<Grid item xs={4}>
					<NewImmunizationWidget registerNewImmunization={RegisterNewImmunization} />
				</Grid>
			</Grid>
		</>
	);
}
export default withReducer('ProfilesApp', reducer)(Vaccines);
