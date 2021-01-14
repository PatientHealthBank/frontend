import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import { withRouter } from "react-router";
import _ from '@lodash';
import IntakeFormDetailsDialog from './IntakeFormDetailsDialog'
import { orange } from '@material-ui/core/colors';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import phbApi from 'app/services/phbApi'
import ConfirmDialog from '@global/components/ConfirmDialog'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import Avatar from '@material-ui/core/Avatar';


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

function IntakeForm(props) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const classes = useStyles();
	const [intakeForms, setIntakeForm] = React.useState([]);

	const [open, setOpen] = React.useState(false)
	const [selectedIntakeForm, setSelectedIntakeForm] = React.useState({})




	const updateQuestionList = () => {
		dispatch(openLoading())
		phbApi().get('IntakeForm/List').then(res => {
			setIntakeForm(res.data)
			dispatch(closeLoading())
		}).catch(err => {
			dispatch(closeLoading())
		})
	}

	React.useEffect(() => {
		updateQuestionList()
	}, [])

	const setIntakeFormSelected = (intakeForm) =>{
		setSelectedIntakeForm(intakeForm)
		setOpen(true)
	}

	const navigateQuestion = () => {
		props.history.push('/admin-intake-form/')
	}

	const goBack = () => {
		props.history.goBack();
	}

	const getQuestionType = (typeId) => {

		switch (typeId) {
			case 1:
				return "Checkbox"
				break;
			case 2:
				return "TextField"
				break;
			case 3:
				return "Select"
				break;
			case 4:
				return "NumericField"
				break;
			case 5:
				return "MultSelect"
				break;

			default:
				break;
		}
	}
	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				(
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<Typography
								className="normal-case flex items-center sm:mb-12"
								component={Link}
								role="button"
								onClick={goBack}
								color="inherit"
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">IntakeForms</span>
							</Typography>

							<div className="flex items-center max-w-full">

								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">

								</div>
							</div>
						</div>
					</div>
				)
			}
			content={
				(
					<div>
						<div className="flex-1 lg:px-12">
							<div className="flex justify-center sm:justify-start flex-wrap m-8">
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
								{intakeForms.map((intakeForm, i) => (
									<div

										onClick={() => setIntakeFormSelected(intakeForm)}
										// onKeyDown={() => setFeaturedImage(media.id)}
										role="button"
										tabIndex={0}
										className={clsx(
											classes.productImageItem,
											'flex items-center justify-center relative flex-col w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
											// media.id === form.featuredImageId && 'featured'
										)}
										key={intakeForm.id}
									>
										<div style={{ fontWeight: '700' }} >{intakeForm.description}</div>

										<Icon>visibility </Icon>
									</div>
								))}
							</div>
						</div>
						<IntakeFormDetailsDialog setOpen={setOpen} open={open} intakeForm={selectedIntakeForm} getQuestionType={getQuestionType} ></IntakeFormDetailsDialog>
					</div>
				)
			}
			innerScroll
		/>
	);

}

// export default withRouter(withReducer('eCommerceApp', reducer))(Appointment);
export default withRouter(IntakeForm);