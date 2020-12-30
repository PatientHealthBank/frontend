import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ClinicHeader from './ClinicHeader';
import ClinicTable from './ClinicTable';

function Clinic() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<ClinicHeader />}
			content={<ClinicTable />}
			innerScroll
		/>
	);
}

export default withReducer('ClinicApp', reducer)(Clinic);
