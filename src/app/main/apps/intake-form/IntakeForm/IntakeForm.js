import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import { withRouter } from "react-router";
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: '100%',
	},
	typeIcon: {
		'&.TXT:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.PDF:before': {
			content: "'picture_as_pdf'",
			color: '#F44336'
		},
		'&.DOCX:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.XLS:before': {
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
	checkListItem: {
		'&.completed': {
			background: 'rgba(0,0,0,0.03)',
			'& .todo-title, & .todo-notes': {
				textDecoration: 'line-through'
			}
		}
	}
}));


function Question(props) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const classes = useStyles(props);
	const [title, setTitle] = React.useState('');
	const [questions, setQuestions] = React.useState([]);
	const [selectedQuestions, setSelectedQuestions] = React.useState([]);

	const [open, setOpen] = React.useState(false)



	const removeQuestion = (index, question) => {
		var newOpt = [...selectedQuestions]
		newOpt.splice(index, 1)
		setQuestions([...questions, question])
		setSelectedQuestions(newOpt)
	}

	const handleChange = (index, event) =>{
		var newOpt = [...selectedQuestions]
		newOpt[index].isRequired = event.target.checked
		setSelectedQuestions(newOpt)
	}
	const addQuestion = (index, question) => {
		var newOpt = [...questions]
		newOpt.splice(index, 1)
		setSelectedQuestions([...selectedQuestions, question])
		setQuestions(newOpt)
	}

	const updateQuestionList = () => {
		dispatch(openLoading())
		phbApi().get('question').then(res => {
			setQuestions(res.data)
			dispatch(closeLoading())
		}).catch(err => {
			dispatch(closeLoading())
		})
	}

	React.useEffect(() => {
		updateQuestionList()
	}, [])

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
	const isValidQuestion = ()=>{
		return title && selectedQuestions.length > 0
	}
	const handleDialog=()=>{
		setOpen(true)
	}
	const saveIntakeForm = async () => {
		var res = await phbApi().post('intakeForm',{
			description: title,
			questions: selectedQuestions
		})
	}

	const goBack = () => {
		props.history.goBack();
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
								<span className="mx-4">IntakeForm</span>
							</Typography>

							<div className="flex items-center max-w-full">

								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">

								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!isValidQuestion()}
								onClick={handleDialog}
							>
								Save
							</Button>
						</FuseAnimate>
					</div>
				)
			}
			content={
				(<div className="p-16 sm:p-24">

					<Grid container className={classes.root} spacing={2}>
						<Grid item xs={12}>

							<h2><strong>Basic IntakeForm Info</strong></h2>
							<Divider></Divider>
						</Grid>
						<Grid item xs={2}>
							<FormControl className={classes.formControl}>
								<TextField id="outlined-basic" value={title} onChange={(e) => setTitle(e.target.value)} label="Description" variant="standard" />
							</FormControl>
						</Grid>
								<Grid item xs={12}>
									<h2><strong>IntakeFormQuestions</strong></h2>
									<Divider></Divider>
								</Grid>
								<Grid item xs={12}>
									<Grid container className={classes.root} spacing={2}>
										<Grid item xs={4} style={{ margin: '0 15px', border: '1px solid #e0e0e0' }}>
										<h3 style={{textAlign:'center'}}><strong>Questions</strong></h3>
										<Divider></Divider>

											{questions &&
												<FormControl className={classes.formControl} >
													<TableContainer>
														<Table
															className={classes.table}
															aria-labelledby="tableTitle"
															aria-label="enhanced table"
														>

															<TableHead>
																<TableRow>
																	<TableCell>
																		Description
																	</TableCell>
																	<TableCell>
																		Type
																	</TableCell>
																	<TableCell>
																		Add Question
																	</TableCell>
																</TableRow>
															</TableHead>
															<TableBody>
																{questions.map((item, i) => (
																	<TableRow key={i}>
																		<TableCell>
																			{item.description}
																		</TableCell>
																		<TableCell>
																			{getQuestionType(item.questionType)}
																		</TableCell>
																		<TableCell>
																			<Tooltip>
																				<Button onClick={() => addQuestion(i, item)}><Icon>add_circle_outline</Icon></Button>
																				</Tooltip>
																		</TableCell>
																	</TableRow>
																))}
															</TableBody>
														</Table>
													</TableContainer>
												</FormControl>}
										</Grid>
										<Grid item xs={2}>
										<Divider orientation="vertical" flexItem />
										</Grid>
										<Grid item xs={4} style={{ margin: '0 15px', border: '1px solid #e0e0e0' }}>
										<h3 style={{textAlign:'center'}}><strong>Selected Questions</strong></h3>
										<Divider></Divider>

											{selectedQuestions &&
												<FormControl className={classes.formControl} >
													<TableContainer>
														<Table
															className={classes.table}
															aria-labelledby="tableTitle"
															aria-label="enhanced table"
														>

															<TableHead>
																<TableRow>
																	<TableCell>
																		Description
												</TableCell>
																	<TableCell>
																		Value
														</TableCell>
														<TableCell>
																		IsRequired
														</TableCell>
																	<TableCell>
																		Remove
														</TableCell>
																</TableRow>
															</TableHead>
															<TableBody>
																{selectedQuestions.map((item, i) => (
																	<TableRow key={i}>
																		<TableCell>
																			{item.description}
																		</TableCell>
																		<TableCell>
																			{getQuestionType(item.questionType)}
																		</TableCell>
																		<TableCell>
																		<Checkbox
																			checked={item.isRequired}
																			onChange={(event)=> handleChange(i,event)}
																			inputProps={{ 'aria-label': 'primary checkbox' }}
																		/>
																		</TableCell>
																		<TableCell>
																			<Button onClick={() => removeQuestion(i, item)}><Icon>delete</Icon></Button>
																		</TableCell>
																	</TableRow>
																))}
															</TableBody>
														</Table>
													</TableContainer>
												</FormControl>}
										</Grid>
									</Grid>
								</Grid>

					</Grid>
					<ConfirmDialog
						open={open}
						setOpen={setOpen}
						callBack={saveIntakeForm}
						thenAction={()=>props.history.push('/admin-intake-forms')}

					/>
				</div>
				)
			}
			innerScroll
		/>
	);

}

// export default withRouter(withReducer('eCommerceApp', reducer))(Appointment);
export default withRouter(Question);