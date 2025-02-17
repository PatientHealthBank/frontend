import Typography from '@material-ui/core/Typography';
import React from 'react';

function TreatmentsHeader(props) {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
					My Treatments
					</Typography>
			</div>
		</div>
	);
}

export default TreatmentsHeader;
