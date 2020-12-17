import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import reducer from '../doctors/store';
import { useSelector } from 'react-redux'
import Widget5 from './widgets/Widget5';
import phbApi from 'app/services/phbApi'
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
	const confirmAppointmentData = useSelector(({ confirmAppointment }) => confirmAppointment)
	if (!confirmAppointmentData.state.jobDay) {
		props.history.push("/dashboard")
	}
	const user = useSelector(({ auth }) => auth.user)
	const classes = useStyles(props);
	const pageLayout = useRef(null);

	const [specialties, setSpecialties] = React.useState([]);

	React.useEffect(() => {
		if (confirmAppointmentData.state.provider) {
			dispatch(openLoading())

			phbApi().get("/provider/specialty/" + confirmAppointmentData.state.provider.id).then(res => {
				dispatch(closeLoading())
				if (res.data.specialties) {
					setSpecialties(res.data.specialties)
				}
			}).
				catch(err => {
					dispatch(closeLoading())
				})
		}
	}, [])




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
							Confirm Appointment
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
							{confirmAppointmentData.state.jobDay &&
								<Widget5 clinic={confirmAppointmentData.state.clinic}
									user={user}
									doctor={confirmAppointmentData.state.provider}
									hour={confirmAppointmentData.state.jobHour}
									day={confirmAppointmentData.state.jobDay}
									specialties={specialties}
								/>}
						</div>
					</FuseAnimateGroup>
				</div>
			}

			ref={pageLayout}
		/>
	);
}

export default withRouter(withReducer('confirmAppointment', reducer)(DoctorsApp));