import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import reducer from './store';
import { getProjects, selectProjects } from './store/projectsSlice';
import { getWidgets, selectWidgets } from './store/widgetsSlice';

import Widget5 from './widgets/Widget5';




const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	}
}));

function ProjectDashboardApp(props) {
	const routeParams = useParams();
	const dispatch = useDispatch();
	const widgets = useSelector(selectWidgets);
	const projects = useSelector(selectProjects);

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	useEffect(() => {
		dispatch(getWidgets());
		dispatch(getProjects());
	}, [dispatch]);

	// return null;
	if (_.isEmpty(widgets) || _.isEmpty(projects)) {
		return null;
	}

	return (
		<FusePageSimple
			classes={{
				toolbar: 'min-h-48 h-48',
				rightSidebar: 'w-288',
				content: classes.content
			}}
			header={
				<div className="flex flex-col justify-between flex-1 px-24 pt-24">
						<div className="flex flex-row">
							<Typography className="py-0 sm:py-24 text-24 md:text-32" variant="h4">
								{routeParams.specialty} - {routeParams.city}
							</Typography>
						</div>
						<div className="flex flex-row" style={{marginTop:"-3%"}}>
							<div className="py-0 sm:py-24" >
								Click on each clinic to see their availability.
							</div>
						</div>

					
				</div>
			}

			content={
				<div className="p-12">
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<div className="widget flex w-full p-12" style={{padding:"10px"}}>
								<Widget5 widget={widgets.widget5} city={routeParams.city} specialty={routeParams.specialty} />
							</div>
						</FuseAnimateGroup>
				</div>
			}

			ref={pageLayout}
		/>
	);
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
