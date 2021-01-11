import React from 'react';
import EmergencyContactListWidget from './widgets/emergencyContact/EmergencyContactListWidget';
import NewEmergencyContactWidget from './widgets/emergencyContact/NewEmergencyContactWidget';
import Grid from '@material-ui/core/Grid';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { listEmergencyContact } from '../../shared/store/emergencyContactSlice'

function EmergencyContact() {
	const { t } = useTranslation();
	const user = useSelector(({ auth }) => auth.user);

	const dispatch = useDispatch();
	const emergencyContact = useSelector(({ ProfilesApp }) => ProfilesApp.emergencyContact);

	React.useEffect(() => {
		if (emergencyContact.length == 0) {
			dispatch(listEmergencyContact())
		}
	}, [dispatch])


	const RegisterNewEmergencyContact = (name, phone, email, kinship) => {
		dispatch(openLoading())
		phbApi().post("/emergencyContact/register/", { Name: name, Phone: phone, Email: email, Kinship: kinship, UserId: user.uuid }).then(res => {
			dispatch(closeLoading())
			dispatch(listEmergencyContact())
		}).
			catch(err => {
				console.log(err);
				dispatch(closeLoading())
			})
	}
	const DeleteEmergencyContact= (id) => {
		dispatch(openLoading())
		phbApi().delete("/emergencyContact/delete/" + id).then(res => {
			dispatch(listEmergencyContact())
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
			<div className="flex-1 lg:px-12">
				<h1>{t('Emergency Contact')}</h1>
			</div>

			<Grid container spacing={3} >

				<Grid item xs={8}>
					<EmergencyContactListWidget emergencyContact={emergencyContact} deleteEmergencyContact={DeleteEmergencyContact} />
				</Grid>
				<Grid item xs={4}>
					<NewEmergencyContactWidget registerNewEmergencyContact={RegisterNewEmergencyContact} />
				</Grid>
				
			</Grid>
		</>
	);
}
export default withReducer('ProfilesApp', reducer)(EmergencyContact);
