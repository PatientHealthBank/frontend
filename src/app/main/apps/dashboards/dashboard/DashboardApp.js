import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import reducer from './store';
import Widget5 from './widgets/Widget5';

function DoctorsApp(props) {
	const pageLayout = useRef(null);
	return (
		<FusePageSimple 
			layout={1}
			classes={{
				toolbar: 'min-h-48 h-48',
				rightSidebar: 'w-288'
			}}
			header={
				<div className="flex flex-col justify-between flex-1 px-24 pt-24">
						<Typography className="py-0 sm:py-24 text-24 md:text-32" variant="h4">
							Hello, John Doe!
						</Typography>
				</div>
			}

			content={
				<div>
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
								<Widget5/>
						</FuseAnimateGroup>
				</div>
			}

			ref={pageLayout}
		/>
	);
}

export default withReducer('DoctorsApp', reducer)(DoctorsApp);
