import FusePageCarded from '@fuse/core/FusePageCarded';
import React from 'react';
import FamilyMembersHeader from './FamilyMembersHeader';
import FamilyMembersTable from './FamilyMembersTable';

function FamilyMembers() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<FamilyMembersHeader />}
			content={<FamilyMembersTable />}
			innerScroll
		/>
	);
}

export default FamilyMembers;