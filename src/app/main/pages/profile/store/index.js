import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import vaccines from '../../../shared/store/vaccinesSlice';
import medicines from '../../../shared/store/medicinesSlice';
import allergies from '../../../shared/store/allergiesSlice';
import strength from '../../../shared/store/strengthWidgetSlice';
import parameters from './parameterSlice';
import emergencyContact from '../../../shared/store/emergencyContactSlice';
import intakeForm from './intakeFormSlice';

import patientInformation from './patientInformationSlice';
import insurancePlan from './insurancePlanSlice';
import addressInformation from './addressInformationSlice';

const reducer = combineReducers({
	intakeForm,
	allergies,
	strength,
	profile,
	vaccines,
	medicines,
	parameters,
	emergencyContact,
	patientInformation,
	insurancePlan,
	addressInformation
});

export default reducer;
