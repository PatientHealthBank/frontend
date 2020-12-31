import FusePageCarded from '@fuse/core/FusePageCarded';
import React from 'react';
import InvoicesHeader from './InvoicesHeader';
import InvoicesTable from './InvoicesTable';

import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from 'app/fuse-layouts/shared-components/loadingModal/LoadingModal';
import { useTranslation } from "react-i18next";
import withReducer from 'app/store/withReducer';
import reducer from './store';
import {listInvoices} from './store/invoicesSlice';


function Invoices() {

	const { t } = useTranslation();
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const invoiceRows = useSelector(( {Invoices} ) => Invoices.invoices);

	React.useEffect(()=>{
		if(invoiceRows.length == 0){
			dispatch(listInvoices());
		}
	},[dispatch]);

	const RegisterNewInvoices = (companyName, serviceDate, serviceValue, registerServiceProvider, fileUrl)=>{
		dispatch(openLoading())

		if(fileUrl){

			var formData = new FormData();

			formData.append("file", fileUrl);

			phbApi().post("/Invoices/file", formData, { headers: {
				'Content-Type': 'multipart/form-data'}
			}
			
			).then(res => {

				phbApi().post("/Invoices/register", {
					CompanyName: companyName, 
					ServiceDate: serviceDate, 
					ServiceValue: serviceValue, 
					RegisterServiceProvider: registerServiceProvider, 
					FileUrl: res.data, 
					UserId: user.uuid,
					ApointmentId: null
				}).then(response => {
				
				}).
					catch(error => {
						dispatch(closeLoading())
				});

				dispatch(closeLoading())
				dispatch(listInvoices())

			}).
			catch(err => {
				dispatch(closeLoading())
			})

		}
				
	}

	const DeleteInvoices = (id, fileUrl)=>{

		phbApi().delete("/Invoices/file?imageName="+fileUrl).then(res => {
			console.log('del', res);
		}).catch(err => {
			dispatch(closeLoading())
		});

		dispatch(openLoading())
		phbApi().delete("/Invoices/delete/"+id).then(res => {
			dispatch(listInvoices())
			dispatch(closeLoading())
		}).
			catch(err => {
				dispatch(closeLoading())
			});
	}

	const DeleteInvoicesFiles = (fileUrl)=>{

		phbApi().delete("/Invoices/file?imageName="+fileUrl).then(res => {
			dispatch(listInvoices())
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

	const UpdateInvoices = (id, companyName, serviceDate, serviceValue, registerServiceProvider, fileUrl)=>{

			dispatch(openLoading())
			phbApi().put("/Invoices/update", {
					Id: id,
					CompanyName: companyName, 
					ServiceDate: serviceDate, 
					ServiceValue: serviceValue, 
					RegisterServiceProvider: registerServiceProvider, 
					FileUrl: fileUrl, 
					UserId: user.uuid,
					ApointmentId: null
				}).then(res => {
				dispatch(closeLoading())
				dispatch(listInvoices())
			}).
				catch(err => {
					dispatch(closeLoading())
			})

	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<InvoicesHeader />}
			content={
				<InvoicesTable 
					invoiceRows={invoiceRows} 
					RegisterNewInvoices={RegisterNewInvoices}
					DeleteInvoices={DeleteInvoices}
					UpdateInvoices={UpdateInvoices} 
					DeleteInvoicesFiles={DeleteInvoicesFiles}
					DownloadInvoiceFile={DownloadInvoiceFile}
				/>
			}
			innerScroll
		/>
	);
}

export default withReducer('Invoices', reducer)(Invoices);