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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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
	const routeParams = useParams()
	const {id} = routeParams
	const dispatch = useDispatch();
	const theme = useTheme();


	const classes = useStyles(props);
	const [type, setType] = React.useState('');
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [value, setValue] = React.useState('');
	const [options, setOptions] = React.useState([]);
	const [open, setOpen] = React.useState(false)


	const addOption = () => {
		setOptions([...options, { value, description }])
		setValue("");
		setDescription("")
	}
	const removeOption = (index) => {
		var newOpt = [...options]
		newOpt.splice(index, 1)
		setOptions(newOpt)
	}



	const handleChange = (event) => {
		setType(event.target.value);
	};
	const isValidQuestion = ()=>{
		if(type != 5 && type != 3){
			console.log(title,type)
			return title && type;
		} 
		else{
			return title && type && options.length > 0;
		}
	}
	const handleDialog=()=>{
		setOpen(true)
	}
	const saveQuestion = async () => {
		var res = await phbApi().post('intakeForm/question',{
			description: title,
			id,
			questionType: type,
			options
		})
		setOptions([])
		setValue('')
		setDescription('')
		setTitle('')
		setType('')
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
								<span className="mx-4">Questions</span>
							</Typography>

							<div className="flex items-center max-w-full">

								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
										New Question
									</Typography>
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

							<h3><strong>Basic Info</strong></h3>
							<Divider></Divider>
						</Grid>
						<Grid item xs={2}>
							<FormControl className={classes.formControl}>
								<InputLabel id="demo-simple-select-label">Type</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={type}
									onChange={handleChange}
								>
									<MenuItem value={1}>Checkbox</MenuItem>
									<MenuItem value={2}>TextField</MenuItem>
									<MenuItem value={3}>Select</MenuItem>
									<MenuItem value={4}>NumericField</MenuItem>
									<MenuItem value={5}>MultSelect</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={2}>
							<FormControl className={classes.formControl}>
								<TextField id="outlined-basic" value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="standard" />
							</FormControl>
						</Grid>
						{(type == 3 || type == 5) &&
							<>
								<Grid item xs={12}>
									<h3><strong>Question Options</strong></h3>
									<Divider></Divider>
								</Grid>
								<Grid item xs={12}>
									<Grid container className={classes.root} spacing={2}>
										<Grid item xs={2}>
											<FormControl className={classes.formControl}>
												<TextField id="outlined-basic" value={description} onChange={(e) => setDescription(e.target.value)} label="Description" variant="standard" />
											</FormControl>
										</Grid>
										<Grid item xs={2}>
											<FormControl className={classes.formControl}>
												<TextField id="outlined-basic" value={value} onChange={(e) => setValue(e.target.value)} label="Value" variant="standard" />
											</FormControl>
										</Grid>
										<Grid item xs={1}>
											{value && description &&
												<FormControl className={classes.formControl}>
													<Button onClick={() => addOption()} variant="contained" color="secondary" ><Icon>arrow_forward</Icon></Button>
												</FormControl>
											}
										</Grid>
										<Grid item xs={4}>

											{options && options.length > 0 &&
												<FormControl className={classes.formControl} style={{ margin: '0 15px', border: '1px solid #e0e0e0' }}>
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
																		Remove
														</TableCell>
																</TableRow>
															</TableHead>
															<TableBody>
																{options.map((item, i) => (
																	<TableRow key={i}>
																		<TableCell>
																			{item.description}
																		</TableCell>
																		<TableCell>
																			{item.value}
																		</TableCell>
																		<TableCell>
																			<Button onClick={() => removeOption(i)}><Icon>delete</Icon></Button>
																		</TableCell>
																	</TableRow>
																))}
															</TableBody>
														</Table>
													</TableContainer>
												</FormControl>}
										</Grid>
									</Grid>
								</Grid></>}

					</Grid>
					<ConfirmDialog
						open={open}
						setOpen={setOpen}
						callBack={saveQuestion}
						thenAction={()=>props.history.push('/admin-questions')}
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