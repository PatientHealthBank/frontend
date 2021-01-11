import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import AppointmentsHeader from './AppointmentsHeader';
import AppointmentsTable from './AppointmentsTable';
import { useDispatch, useSelector } from 'react-redux';
import {appointmentsList} from '../store/appointmentsSlice';
import phbApi from 'app/services/phbApi';

import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import LoadingModal from 'app/fuse-layouts/shared-components/loadingModal/LoadingModal';
import { useTranslation } from "react-i18next";


function Appointments() {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();
	const appointments = useSelector(( {AppointmentsApp} ) => AppointmentsApp.appointments);
	const [invoices, setInvoices] = React.useState(false);
	
	const invoiceList = (user) => {
		phbApi().get('/Invoices/list/'+user.uuid)
		.then(({data}) => {
			setInvoices(data);
		});
	}
	
	React.useEffect(()=>{
		invoiceList(user);

		if(appointments.length == 0){
			dispatch(appointmentsList())
		}
	},[dispatch]);

	const RegisterNewInvoices = (companyName, serviceDate, serviceValue, registerServiceProvider, appointmentId, fileUrl)=>{
		dispatch(openLoading())

		if(fileUrl){
			var formData = new FormData();
			formData.append("file", fileUrl);

			phbApi().post("/Invoices/file", formData, { headers: {
				'Content-Type': 'multipart/form-data'}
			}).then(res => {
				NewInvoice(companyName, serviceDate, serviceValue, registerServiceProvider, appointmentId, res.data, user.uuid);
			}).
			catch(err => {
				dispatch(closeLoading())
			});
		}else{
			NewInvoice(companyName, serviceDate, serviceValue, registerServiceProvider, appointmentId, fileUrl, user.uuid);
		}
				
	}

	const NewInvoice = (companyName, serviceDate, serviceValue, registerServiceProvider, appointmentId, fileUrl, userId) => {
		phbApi().post("/Invoices/register", {
			CompanyName: companyName, 
			ServiceDate: serviceDate, 
			ServiceValue: serviceValue, 
			RegisterServiceProvider: registerServiceProvider, 
			FileUrl: fileUrl, 
			UserId: userId,
			AppointmentId: appointmentId
		}).then(res => {
			invoiceList(user);
			dispatch(closeLoading());
			dispatch(appointmentsList());
		});	
	}

	const DeleteInvoices = (id, fileUrl)=>{

		phbApi().delete("/Invoices/file?imageName="+fileUrl).then(res => {
			console.log('del', res);
		}).catch(err => {
			dispatch(closeLoading())
		});

		dispatch(openLoading())
		phbApi().delete("/Invoices/delete/"+id).then(res => {
			dispatch(appointmentsList())
			dispatch(closeLoading())
		}).
			catch(err => {
				dispatch(closeLoading())
			});
	}

	const DeleteInvoicesFiles = (fileUrl)=>{

		phbApi().delete("/Invoices/file?imageName="+fileUrl).then(res => {
			dispatch(appointmentsList())
			dispatch(closeLoading())
		}).catch(err => {
			dispatch(closeLoading())
		});


	}

	const DownloadInvoiceFile = (fileUrl) => {

		var ext = fileUrl.split('/').pop();
		ext = ext.indexOf('.') < 1 ? '' : ext.split('.').pop();

		phbApi().get("/Invoices/file?imageName="+fileUrl).then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'Invoice-file.'+ext);
			document.body.appendChild(link);
			link.click();
		});

	}

	const UpdateInvoices = (id, companyName, serviceDate, serviceValue, registerServiceProvider, appointmentId, fileUrl, currentFile)=>{
		dispatch(openLoading());
			
		if(fileUrl){

			if(currentFile){
				phbApi().delete("/Invoices/file?imageName="+currentFile);
			}

			var formData = new FormData();
			formData.append("file", fileUrl);

			phbApi().post("/Invoices/file", formData, { headers: {
				'Content-Type': 'multipart/form-data'}
			}).then(res => {
				EditInvoice(id, companyName, serviceDate, serviceValue, registerServiceProvider, appointmentId, res.data, user.uuid);
			}).
			catch(err => {
				dispatch(closeLoading())
			});
		}else{
			EditInvoice(id, companyName, serviceDate, serviceValue, registerServiceProvider, appointmentId, fileUrl, user.uuid);
		}
			
	}

	const EditInvoice = (id, companyName, serviceDate, serviceValue, registerServiceProvider, appointmentId, fileUrl, userId) => {
		phbApi().put("/Invoices/update", {
			Id: id,
			CompanyName: companyName, 
			ServiceDate: serviceDate, 
			ServiceValue: serviceValue, 
			RegisterServiceProvider: registerServiceProvider, 
			FileUrl: fileUrl, 
			UserId: userId,
			ApointmentId: appointmentId
		}).then(res => {
			invoiceList(user);
			dispatch(closeLoading());
			dispatch(appointmentsList());
		});	
	}

	return (

		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<AppointmentsHeader/>}
			content={<AppointmentsTable 
					appointments={appointments} 
					RegisterNewInvoices={RegisterNewInvoices}
					DeleteInvoices={DeleteInvoices}
					UpdateInvoices={UpdateInvoices} 
					DeleteInvoicesFiles={DeleteInvoicesFiles}
					DownloadInvoiceFile={DownloadInvoiceFile}
					invoices={invoices}/>}
			innerScroll
		/>
	);
}

export default withReducer('AppointmentsApp', reducer)(Appointments);
