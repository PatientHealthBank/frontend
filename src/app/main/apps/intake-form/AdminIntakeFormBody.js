import React from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import phbApi from 'app/services/phbApi'
import { useSelector, useDispatch } from 'react-redux';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { setIntakeForm } from './store/intakeFormSlice'
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
	},
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function ProfileMedicalHistory(props) {
	const [intakeForms, setIntakeForms] = React.useState([]);
	const dispatch = useDispatch()

	const updateIntakeFormList = () => {
		dispatch(openLoading())
		phbApi().get('Intakeform/list').then(res => {
			setIntakeForms(res.data)
			dispatch(closeLoading())
		}).catch(err => {
			dispatch(closeLoading())
		})
	}

	const navigateQuestion = () => {
		props.history.push('/admin-question')
	}
	React.useEffect(() => {
		updateIntakeFormList()
	}, [])
	const classes = useStyles(props);
	const handleIntakeForm = (intakeForm) => {
		dispatch(setIntakeForm(intakeForm))
		//props.history.push("/intake-form")
	}


	return (
		<div>
			<div className="flex-1 lg:px-12">
				<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
					<label
						onClick={() => navigateQuestion()}
						htmlFor="button-file"
						className={clsx(
							classes.productImageUpload,
							'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
						)}>
						<Icon fontSize="large" color="action">
							add_circle_outline
										</Icon>
					</label>
					{intakeForms && intakeForms.map((intakeform, i) => (
						<div
							style={{ backgroundColor: "#DEFFBD" }}
							// onClick={() => setFeaturedImage(media.id)}
							// onKeyDown={() => setFeaturedImage(media.id)}
							role="button"
							tabIndex={0}
							onClick={() => handleIntakeForm(intakeform)}
							className={clsx(
								classes.productImageItem,
								'flex items-center justify-center relative flex-col w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
								// media.id === form.featuredImageId && 'featured'
							)}
							key={intakeform.id}
						>
							<div style={{ fontWeight: '700' }} >{intakeform.description}</div>
							<Icon>format_align_justify </Icon>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default withReducer('IntakeFormApp', reducer)(withRouter(ProfileMedicalHistory));
