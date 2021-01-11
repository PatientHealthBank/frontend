import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles(theme => ({
	 formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
	  setAge(event.target.value);
	};

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
								to="/appointments"
								color="inherit"
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">Questions</span>
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
								onClick={() => true}
							>
								Save
							</Button>
						</FuseAnimate>
					</div>
				)
			}
			content={
					(<div className="p-16 sm:p-24">

							<FormControl className={classes.formControl}>
								<InputLabel id="demo-simple-select-label">Age</InputLabel>
								<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={age}
								onChange={handleChange}
								>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>

					</div>)
			}
			innerScroll
		/>
	);

}

// export default withRouter(withReducer('eCommerceApp', reducer))(Appointment);
export default Question;