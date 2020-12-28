import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import vaccines from './vaccinesSlice';
import medicines from './medicinesSlice';
import allergies from './allergiesSlice';
import strength from './strengthSlice';
import parameters from './parameterSlice';
import emergencyContact from './emergencyContactSlice';
import intakeForm from './intakeFormSlice';

import patientInformation from './patientInformationSlice';


const reducer = combineReducers({
	intakeForm,
	allergies,
	strength,
	profile,
	vaccines,
	medicines,
	parameters,
	emergencyContact,
	patientInformation
});

export default reducer;
