import React from 'react';
import reducer from './store';
import phbApi from 'app/services/phbApi'
import withReducer from 'app/store/withReducer';
import PatientInformationWidget from './widgets/patient/PatientInformationWidget';
import AdressInformationWidget from './widgets/patient/AdressInformationWidget';
import InsurancePlanWidget from './widgets/patient/InsurancePlanWidget';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { patientInfo } from './store/patientInformationSlice';

function PatientInformation() {
    const user = useSelector(({ auth }) => auth.user);

    const dispatch = useDispatch();
    const patientInformation = useSelector(({ ProfilesApp }) => ProfilesApp.patientInformation);

    React.useEffect(() => {
        dispatch(patientInfo())
    }, [dispatch])

    const EditPatientInformation = (name, birthdate, ssn, phone, email, photoURL) => {
        dispatch(openLoading())
        phbApi().post("/patient/edit/", { Id: user.currentUser.id, Name: name, Birthdate: birthdate, SSN: ssn, Phone: phone, Email: email, PhotoURL: photoURL, PatientTypeId: user.currentUser.patientType}).then(res => {
            dispatch(closeLoading())
            dispatch(patientInfo())
        }).
            catch(err => {
                console.log(err);
                dispatch(closeLoading())
            })
    }

    return (
        <>
            <div className="p-16 sm:p-24">
                <div>

                    <PatientInformationWidget patientInformation={patientInformation} editPatientInformation={ EditPatientInformation } />
                    <AdressInformationWidget adresstInformation={patientInformation} />
                    <InsurancePlanWidget insurancePlan={patientInformation} />

                </div>
            </div>
        </>
    );
}
export default withReducer('ProfilesApp', reducer)(PatientInformation);

