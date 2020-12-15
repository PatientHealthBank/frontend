import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from './store';
import TreatmentsHeader from './TreatmentsHeader';
import TreatmentsTable from './TreatmentsTable';

function Treatments() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<TreatmentsHeader />}
			content={<TreatmentsTable />}
			innerScroll
		/>
	);
}

export default withReducer('TreatmentsApp', reducer)(Treatments);
