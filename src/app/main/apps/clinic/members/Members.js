import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import MembersHeader from './MembersHeader';
import MembersTable from './MembersTable';

function Members() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<MembersHeader />}
			content={<MembersTable />}
			innerScroll
		/>
	);
}

export default withReducer('MembersApp', reducer)(Members);
