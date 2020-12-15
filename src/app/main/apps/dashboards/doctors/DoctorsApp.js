import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useRef, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import reducer from './store';
import Widget5 from './widgets/Widget5';
import phbApi from '../../../../services/phbApi'
import LoadingModal from '../../../../fuse-layouts/shared-components/loadingModal/LoadingModal'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { useDispatch } from 'react-redux';


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

function DoctorsApp(props) {
	const dispatch = useDispatch();

	const routeParams = useParams();
	const queryParams = new URLSearchParams(props.location.search)
	const specialty = queryParams.get("specialty");
	const clinicalInterest = queryParams.get("clinicalInterest");
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [providers, setProviders] = React.useState([])
	const [clinic, setClinic] = React.useState({})

	React.useEffect(() => {
		dispatch(openLoading())
		phbApi().get("/provider/clinic/"+routeParams.clinicId , { params: { specialty, clinicalInterest } }).then(res => {
			dispatch(closeLoading())
			if(res.data.providers){
				console.log(res.data.providers)
				setProviders(res.data.providers)
				setClinic(res.data.clinic)
			}
		}).
			catch(err => {
				dispatch(closeLoading())
			})
	},[])


	return (
		<FusePageSimple
			classes={{
				toolbar: 'min-h-48 h-48',
				rightSidebar: 'w-288',
				content: classes.content
			}}
			header={
				<div className="flex flex-col justify-between flex-1 px-24 pt-24">
					<div className="flex justify-between items-start">
						<Typography className="py-0 sm:py-24 text-24 md:text-32" variant="h4">
							{clinic? clinic.companyName : ""}
						</Typography>

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
						<div className="widget flex w-full p-12" style={{ padding: "10px" }}>
							<Widget5 providers={providers} clinic={clinic} specialty={specialty} clinicalInterest={clinicalInterest} />
						</div>
						<LoadingModal />
					</FuseAnimateGroup>
				</div>
			}

			ref={pageLayout}
		/>
	);
}

export default withRouter(withReducer('confirmAppointment', reducer)(DoctorsApp));


