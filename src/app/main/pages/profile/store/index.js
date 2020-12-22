import { combineReducers } from '@reduxjs/toolkit';
import profile from './profileSlice';
import vaccines from './vaccinesSlice';
import medicines from './medicinesSlice';
import allergies from './allergiesSlice';
import emergencyContact from './emergencyContactSlice';
import patientInformation from './patientInformationSlice';

const reducer = combineReducers({
	allergies,
	profile,
	vaccines,
	medicines,
	emergencyContact,
	patientInformation
});

export default reducer;
