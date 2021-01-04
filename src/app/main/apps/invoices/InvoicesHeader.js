import Typography from '@material-ui/core/Typography';
import React from 'react';


function InvoicesHeader(props) {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
					Invoices
				</Typography>
			</div>
			<div className="flex items-right">
				<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
				</Typography>
			</div>
		</div>
	);
}

export default InvoicesHeader;
