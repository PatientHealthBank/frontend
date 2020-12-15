import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ClinicBranchsHeader from './ClinicBranchsHeader';
import ClinicBranchsTable from './ClinicBranchsTable';

function ClinicBranchs() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<ClinicBranchsHeader />}
			content={<ClinicBranchsTable />}
			innerScroll
		/>
	);
}

export default withReducer('ClinicBranchsApp', reducer)(ClinicBranchs);
