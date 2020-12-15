import React from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ProfileMedicalHistory() {

	return (
		<div>
			<div className="flex-1 lg:px-12">
				<h1>Medical History</h1>
			</div>
		</div>
	);
}

export default withReducer('ProfilesApp', reducer)(ProfileMedicalHistory);
