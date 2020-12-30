import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import reducer from 'app/main/pages/profile/store';
import { useSelector, useDispatch } from 'react-redux';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { setIntakeForm } from 'app/main/pages/profile/store/intakeFormSlice'
import IntakeFormDialog from 'app/main/pages/profile/widgets/IntakeFormDialog'
import { withRouter } from 'react-router-dom';
import phbApi from 'app/services/phbApi'
import withReducer from 'app/store/withReducer';


const useStyles = makeStyles(theme => ({
	typeIcon: {
		'&.PDF:before': {
			content: "'picture_as_pdf'",
			color: '#F44336'
		},
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		}
	},
	margin: {
		margin: theme.spacing(1),
	},
	textField: {
		width: '25ch',
	},
	appointmentImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	appointmentImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	appointmentImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $appointmentImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $appointmentImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $appointmentImageFeaturedStar': {
				opacity: 1
			}
		}
	},
	avatarMain: {
		width: theme.spacing(5),
		height: theme.spacing(5),
		marginLeft: '5px'
	},
}));

function AppointmentPreparation(props) {

	const classes = useStyles(props);
	const [intakeForms, setIntakeForms] = React.useState([]);
	const [intakeFormsPublic, setIntakeFormsPublic] = React.useState([]);
	const [open, setOpen] = React.useState(false);


	const dispatch = useDispatch()
	const user = useSelector(({ auth }) => auth.user);
	const updateIntakeFormList = () => {
		dispatch(openLoading())
		phbApi().get("patient/Intakeform/" + user.currentUser.id).then(res => {
			console.log(res.data)
			setIntakeForms(res.data.filter(item => item.appointmentId == props.preparation.id))
			dispatch(closeLoading())
		}).catch(err => {
			dispatch(closeLoading())
		})
	}
	React.useEffect(() => {
		updateIntakeFormList()
	}, [])

	const handleNewIntakeForm = () => {
		dispatch(openLoading())
		phbApi().get("Intakeform/list").then(res => {
			setIntakeFormsPublic(res.data)
			setOpen(true)
			dispatch(closeLoading())
		}).catch(err => {
			dispatch(closeLoading())
		})
	}
	const newIntakeForm = (intakeformId) => {
		dispatch(openLoading())
		phbApi().post(`/patient/${user.currentUser.id}/Intakeform/${intakeformId}/${props.preparation.id}`).then(res => {
			updateIntakeFormList()
			setOpen(false)

			dispatch(closeLoading())
		}).catch(err => {
			dispatch(closeLoading())
		})
	}
	const handleIntakeForm = (intakeForm) => {
		dispatch(setIntakeForm(intakeForm))
		props.history.push("/intake-form")
	}
	return (
		<div>

			<div>
				<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
					<label
						onClick={() => handleNewIntakeForm()}
						htmlFor="button-file"
						className={clsx(
							classes.productImageUpload,
							'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
						)}>
						<Icon fontSize="large" color="action">
							cloud_upload
										</Icon>
					</label>
					{intakeForms && intakeForms.map((media, i) => (
						<div
							style={{ backgroundColor: media.pending == 0 ? "#DEFFBD" : "#f0020257" }}
							// onClick={() => setFeaturedImage(media.id)}
							// onKeyDown={() => setFeaturedImage(media.id)}
							role="button"
							tabIndex={0}
							onClick={() => handleIntakeForm(media)}
							className={clsx(
								classes.productImageItem,
								'flex items-center justify-center relative flex-col w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
								// media.id === form.featuredImageId && 'featured'
							)}
							key={media.id}
						>
							<div style={{ fontWeight: '700' }} >{media.intakeForm.description}</div>
							<Icon>format_align_justify </Icon>
						</div>
					))}
				</div>
			</div>
			<IntakeFormDialog open={open} setOpen={setOpen} newIntakeForm={newIntakeForm} intakeForms={intakeFormsPublic}></IntakeFormDialog>
		</div>

	);
}


export default withReducer('ProfilesApp', reducer)(withRouter(AppointmentPreparation));