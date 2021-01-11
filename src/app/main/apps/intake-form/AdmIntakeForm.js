import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import AdmIntakeFormHeader from './AdmIntakeFormHeader';
import AdminIntakeFormBody from './AdminIntakeFormBody';



function Treatments() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<AdmIntakeFormHeader />}
			content={<AdminIntakeFormBody></AdminIntakeFormBody>}
			innerScroll
		/>
	);
}

export default (Treatments);
