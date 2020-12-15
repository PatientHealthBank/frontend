import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import reducer from './store';
import { selectWidgetsEntities, getWidgets } from './store/widgetsSlice';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget33 from './widgets/Widget33';
import Widget9 from './widgets/Widget9';
import Widget10 from './widgets/Widget10';
import Widget11 from './widgets/Widget11';

function TreatmentTracker() {
	const dispatch = useDispatch();
	const widgets = useSelector(selectWidgetsEntities);

	useEffect(() => {
		dispatch(getWidgets());
	}, [dispatch]);

	if (_.isEmpty(widgets)) {
		return null;
	}

	return (
		<div className="w-full">
			<FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col md:flex-row sm:p-8 container">
					<div className="flex flex-1 flex-col min-w-0">
						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 text-2xl">
								My personal goals
							</Typography>
						</FuseAnimate>

						<div className="flex flex-col sm:flex sm:flex-row pb-32">
							<div className="widget flex w-full sm:w-1/3 p-16">
								<Widget2 data={widgets.widget2} />
							</div>

							<div className="widget flex w-full sm:w-1/3 p-16">
								<Widget3 data={widgets.widget3} />
							</div>

							<div className="widget flex w-full sm:w-1/3 p-16">
								<Widget33 data={widgets.widget3} />
							</div>
						</div>

					</div>

					<div className="flex flex-wrap w-full md:w-320 pt-16">
						<div className="widget w-full p-16">
							<Widget9 data={widgets.widget9} />
						</div>
					</div>

				</div>
			</FuseAnimate>

			<div className="flex flex-col md:flex-row sm:p-8 container">
				<div className="flex flex-1 flex-col min-w-0">
					<Typography className="p-16 pb-8 text-2xl">
						My Care Team Treatment Goals
					</Typography>

					<div className="flex flex-col sm:flex sm:flex-row pb-32">
						<div className="widget w-full sm:w-1/3 p-16">
							<Widget10 data={widgets.widget10} />
						</div>
						<div className="widget flex w-full sm:w-1/3 p-16">
							<Widget11 data={widgets.widget11} />
						</div>
					</div>
				</div>
			</div>
		</div >
	);
}

export default withReducer('analyticsDashboardApp', reducer)(TreatmentTracker);
