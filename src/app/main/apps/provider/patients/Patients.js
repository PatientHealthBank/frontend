import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import PatientsHeader from './PatientsHeader';
import PatientsTable from './PatientsTable';

function Patients() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<PatientsHeader />}
			content={<PatientsTable />}
			innerScroll
		/>
	);
}

export default withReducer('providerApp', reducer)(Patients);
