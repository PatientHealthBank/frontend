import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import { withRouter } from "react-router";
import _ from '@lodash';
import QuestionDetailsDialog from './QuestionDetailsDialog'
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



const useStyles = makeStyles(theme => {
	console.log(theme)
	
	return ({
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
		backgroundColor:theme.palette.intakeForm.dark,
		'&:hover': {
			backgroundColor:theme.palette.intakeForm.light,
			boxShadow: '0 0 20px black',
			'& $productImageFeaturedStar': {
				opacity: 0.8,
				
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
})});

function Question(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const classes = useStyles();
	const [questions, setQuestions] = React.useState([]);

	const [open, setOpen] = React.useState(false)
	const [selectedQuestion, setSelectedQuestion] = React.useState({})

	const updateQuestionList = () => {
		dispatch(openLoading())
		phbApi().get('Question').then(res => {
			setQuestions(res.data)
			dispatch(closeLoading())
		}).catch(err => {
			dispatch(closeLoading())
		})
	}

	React.useEffect(() => {
		updateQuestionList()
	}, [])

	const setQuestionSelected = (question) => {
		setSelectedQuestion(question)
		setOpen(true)
	}

	const navigateQuestion = () => {
		props.history.push('/admin-question/')
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
							<div className="flex items-center max-w-full">
								<div className="flex items-center">
									<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
										Questions
									</Typography>
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
										'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-3 hover:shadow-10'
									)}>
									<Icon fontSize="large" color="action">
										add_circle_outline
													</Icon>
								</label>
								{questions.map((question, i) => (
									<div

										onClick={() => setQuestionSelected(question)}
										// onKeyDown={() => setFeaturedImage(media.id)}
										role="button"
										tabIndex={0}
										className={clsx(
											classes.productImageItem,
											'flex items-center justify-center relative flex-col w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1'
											// media.id === form.featuredImageId && 'featured'
										)}
										key={question.id}
									>
										<div style={{ fontWeight: '700', textAlign: 'center' }} >{question.description}</div>
										<div style={{ fontWeight: '400' }} >{getQuestionType(question.questionType)}</div>

										<Icon>visibility </Icon>
									</div>
								))}
							</div>
						</div>
						<QuestionDetailsDialog setOpen={setOpen} open={open} question={selectedQuestion} getQuestionType={getQuestionType}></QuestionDetailsDialog>
					</div>
				)
			}
			innerScroll
		/>
	);

}

// export default withRouter(withReducer('eCommerceApp', reducer))(Appointment);
export default withRouter(Question);