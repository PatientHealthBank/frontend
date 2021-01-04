import React, { useEffect } from 'react';
import reducer from './store';
import phbApi from 'app/services/phbApi'
import withReducer from 'app/store/withReducer';
import PatientInformationWidget from './widgets/patient/PatientInformationWidget';
import AddressInformationWidget from './widgets/patient/AddressInformationWidget';
import InsurancePlanWidget from './widgets/patient/InsurancePlanWidget';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { patientInfo } from './store/patientInformationSlice';
import { addressInfo } from './store/addressInformationSlice';
import { insurancePlanInfo } from './store/insurancePlanSlice';

function PatientInformation() {
    const user = useSelector(({ auth }) => auth.user);

    const dispatch = useDispatch();
    const patientInformation = useSelector(({ PatientInformationApp }) => PatientInformationApp.patientInformation);
    const addressInformation = useSelector(({ PatientInformationApp }) => PatientInformationApp.addressInformation);
    const insurancePlan = useSelector(({ PatientInformationApp }) => PatientInformationApp.insurancePlan);

    useEffect(() => {
        dispatch(patientInfo());
        dispatch(addressInfo());
        dispatch(insurancePlanInfo());
    }, []);
    var currentFile = '';


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

    const RegisterNewAddresstInformation = (addressTypeId, addressLine, country, city, state, zipCode) => {
        dispatch(openLoading())
        phbApi().post("/patient/address/register/", { AddressTypeId: addressTypeId, AddressLine: addressLine, Country: country, City: city, State: state, ZipCode: zipCode, PatientId: user.currentUser.id }).then(res => {
            dispatch(closeLoading())
            dispatch(addressInfo())
        }).
            catch(err => {
                console.log(err);
                dispatch(closeLoading())
            })
    }

    const EditAddresstInformation = (id, addressTypeId, addressLine, country, city, state, zipCode) => {
        dispatch(openLoading())
        phbApi().post("/patient/address/edit", {Id: id, AddressTypeId: addressTypeId, AddressLine: addressLine, Country: country, City: city, State: state, ZipCode: zipCode }).then(res => {
            dispatch(closeLoading())
            dispatch(addressInfo())
        }).
            catch(err => {
                console.log(err);
                dispatch(closeLoading())
            })
    }

    const DeleteAddresstInformation = (id) => {
        dispatch(openLoading())
        phbApi().delete("/patient/address/delete/" + id).then(res => {
            dispatch(closeLoading())
            dispatch(addressInfo())
        }).
            catch(err => {
                console.log(err);
                dispatch(closeLoading())
            })
    }

    const RegisterNewInsurancePlan = (memberName, memberId, memberService, effectiveDate, healthPlan) => {
        dispatch(openLoading())
        phbApi().post("/InsurancePlan/register/", { MemberName: memberName, MemberId: memberId, MemberService: memberService, EffectiveDate: effectiveDate, HealthPlan: healthPlan, PatientId: user.currentUser.id }).then(res => {
            dispatch(closeLoading())
            dispatch(insurancePlanInfo())
        }).
            catch(err => {
                console.log(err);
                dispatch(closeLoading())
            })
    }

    const EditInsurancePlan = (id, memberName, memberId, memberService, effectiveDate, healthPlan) => {
        dispatch(openLoading())
        phbApi().post("/InsurancePlan/edit/", {Id: id, MemberName: memberName, MemberId: memberId, MemberService: memberService, EffectiveDate: effectiveDate, HealthPlan: healthPlan, PatientId: user.currentUser.id }).then(res => {
            dispatch(closeLoading())
            dispatch(insurancePlanInfo())
        }).
            catch(err => {
                console.log(err);
                dispatch(closeLoading())
            })
    }

    const DeleteInsurancePlan = (id) => {
        dispatch(openLoading())
        phbApi().delete("/InsurancePlan/delete/" + id).then(res => {
            dispatch(closeLoading())
            dispatch(insurancePlanInfo())
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
                <PatientInformationWidget patientInformation={patientInformation} editPatientInformation={ EditPatientInformation } currentFile={currentFile} />

                    <AddressInformationWidget addresstInformation={addressInformation} registerNewAddresstInformation={RegisterNewAddresstInformation} editAddresstInformation={EditAddresstInformation} deleteAddresstInformation={DeleteAddresstInformation} />

                    <InsurancePlanWidget insurancePlan={insurancePlan} registerNewInsurancePlan={RegisterNewInsurancePlan} editInsurancePlan={EditInsurancePlan} deleteInsurancePlan={DeleteInsurancePlan}/>
                </div>
            </div>
        </>
    );
}

export default withReducer('PatientInformationApp', reducer)(PatientInformation);


