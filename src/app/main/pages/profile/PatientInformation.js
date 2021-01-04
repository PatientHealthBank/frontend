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
    var currentFile = '';

    React.useEffect(() => {
        dispatch(patientInfo())
    }, [dispatch])

    const EditPatientInformation = (name, birthdate, ssn, phone, email, photoURL, currentPhoto) => {

        dispatch(openLoading())

        if(photoURL){

            if(currentPhoto){
                phbApi().delete("/patient/info/profileImage?imageName="+currentPhoto);
            }

            var formData = new FormData();
            formData.append("file", photoURL);
            phbApi().post("/Invoices/file", formData, { headers: {
                'Content-Type': 'multipart/form-data'}
            }).then(res => {
                EditInfomation(name, birthdate, ssn, phone, email, res.data);           
            }).
            catch(err => {
                dispatch(closeLoading())
            });
        }else{
            EditInfomation(name, birthdate, ssn, phone, email, photoURL);
        }

        

    }

    const EditInfomation = (name, birthdate, ssn, phone, email, photoURL) => {
        phbApi().post("/patient/edit/", { Id: user.currentUser.id, Name: name, Birthdate: birthdate, SSN: ssn, Phone: phone, Email: email, PhotoURL: photoURL, PatientTypeId: user.currentUser.patientType}).then(res => {
            dispatch(closeLoading())
            dispatch(patientInfo())
        }).
        catch(err => {
            console.log(err);
            dispatch(closeLoading())
        });	
    }
    
    if (patientInformation) {
        currentFile = patientInformation.photoURL;
    }   

    return (
        <>
            <div className="p-16 sm:p-24">
                <div>

                    <PatientInformationWidget patientInformation={patientInformation} editPatientInformation={ EditPatientInformation } currentFile={currentFile} />
                    <AdressInformationWidget adresstInformation={patientInformation} />
                    <InsurancePlanWidget insurancePlan={patientInformation} />

                </div>
            </div>
        </>
    );
}
export default withReducer('ProfilesApp', reducer)(PatientInformation);

