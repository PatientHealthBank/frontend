import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import { toggleQuickPanel } from '../../store/notification/stateSlice';
import reducer from '../../store/notification';
import { getData } from '../../store/notification/dataSlice';

const useStyles = makeStyles(theme => ({
	root: {
		width: 350
	},
	ratingSize: {
		display: 'flex',
		flexDirection: 'column',
		'& > * + *': {
			marginTop: theme.spacing(1),
		},
		'& .MuiSvgIcon-root': {
			width: '3em',
			height: '3em'
		}
	},
	listItemText: {
		fontSize: '1.2em',//Insert your required size
	}
}));

function IconContainer(props) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
	value: PropTypes.number.isRequired,
};


const useStyle = makeStyles({
	rating: {
		"& .MuiRating-iconFilled ": {
			color: ({ color }) => `${color}`
		}
	}
});

const StyledRating = ({
	component: ComponentProp = Rating,
	children,
	name,
	color,
	defaultValue,
	getLabelText,
	IconContainerComponent,
	onChange
}) => {
	const classes = useStyle({ color });
	return <Rating className={classes.rating}
		name={name}
		defaultValue={defaultValue}
		getLabelText={getLabelText}
		IconContainerComponent={IconContainerComponent}
		onChange={onChange}
	>{children}</Rating>;
};


const customIcons = {
	1: {
		icon: <SentimentVeryDissatisfiedIcon />,
		label: 'Very Dissatisfied'
	},
	2: {
		icon: <SentimentDissatisfiedIcon />,
		label: 'Dissatisfied'
	},
	3: {
		icon: <SentimentSatisfiedIcon />,
		label: 'Neutral'
	},
	4: {
		icon: <SentimentSatisfiedAltIcon />,
		label: 'Satisfied'
	},
	5: {
		icon: <SentimentVerySatisfiedIcon />,
		label: 'Very Satisfied'
	},
};

function QuickPanel(props) {
	const dispatch = useDispatch();
	const state = useSelector(({ quickPanel }) => quickPanel.state);

	const classes = useStyles();
	const [rating, setRating] = useState(1);
	const [color, setColor] = useState("#123123");;

	const onRatingChange = (value) => {
		if (value === 1) {
			setColor("#ff2111")
		}
		if (value === 2) {
			setColor("#ff8511")
		}
		if (value === 3) {
			setColor("#ffda00")
		}
		if (value === 4) {
			setColor("#90d83a")
		}
		if (value === 5) {
			setColor("#1fd418")
		}
		setRating(value)

	}

	const [explainMore, setExplainMore] = React.useState(true);

	const [title, setTitle] = React.useState('');
	const [open, setOpen] = React.useState(false);
	// eslint-disable-next-line 
	const [maxWidth, setMaxWidth] = React.useState('sm');

	const handleClickOpen = (text) => {
		setTitle(text);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleExplainMore = (event) => {
		setExplainMore(event.target.checked);
	};

	useEffect(() => {
		dispatch(getData());
	}, [dispatch]);

	return (
		<>
			<Drawer
				classes={{ paper: classes.root }}
				open={state}
				anchor="right"
				onClose={ev => dispatch(toggleQuickPanel())}
			>
				<FuseScrollbars>
					<ListSubheader component="div">Today</ListSubheader>

					<div className="mb-0 py-16 px-24">
						<Typography className="mb-12 text-32" color="textSecondary">
							{moment().format('dddd')}
						</Typography>
						<div className="flex">
							<Typography className="leading-none text-32" color="textSecondary">
								{moment().format('DD')}
							</Typography>
							<Typography className="leading-none text-16" color="textSecondary">
								th
						</Typography>
							<Typography className="leading-none text-32" color="textSecondary">
								{moment().format('MMMM')}
							</Typography>
						</div>
					</div>
					<Divider />
					<List>
						<ListSubheader component="div">Notifications</ListSubheader>
						<ListItem button onClick={() => handleClickOpen('How do you feel since your last appointment ?')}>
							<ListItemIcon className="min-w-40 text-red-600">
								<Icon>notifications</Icon>
							</ListItemIcon>
							<ListItemText classes={{ primary: classes.listItemText }} className="text-red-600" primary="How do you feel since your last appointment ?" />
						</ListItem>
						<ListItem button onClick={() => handleClickOpen('How satisfied are you with your treatment ?')}>
							<ListItemIcon className="min-w-40 text-red-600">
								<Icon>notifications</Icon>
							</ListItemIcon>
							<ListItemText classes={{ primary: classes.listItemText }} className="text-red-600" primary="How satisfied are you with your treatment ?" />
						</ListItem>
					</List>
				</FuseScrollbars>
			</Drawer>
			<Dialog
				fullWidth
				maxWidth={maxWidth}
				open={open}
				onClose={handleClose}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Next Appointment: Dr. Smith – Cardiologist October/15/2020
				    </DialogContentText>

					<form className={classes.ratingSize} noValidate>
						<Typography className="mb-8" component="legend">How do you feel ?</Typography>

						<StyledRating
							color={color}
							name="customized-icons"
							defaultValue={rating}
							onChange={(event, newValue) => {
								onRatingChange(newValue);
							}}
							getLabelText={(value) => customIcons[value].label}
							IconContainerComponent={IconContainer}
						/>

						<FormControlLabel
							// className={classes.formControlLabel}
							control={<Switch checked={explainMore} onChange={handleExplainMore} />}
							label="Do you want to explain a bit more?"
						/>
						{explainMore && <TextField
							className="mt-16 mb-16"
							id="othersObservation"
							name="othersObservation"
							// onChange={handleChange}
							label="Explanation?"
							type="text"
							// value={form.othersObservation}
							multiline
							rows={5}
							variant="outlined"
							fullWidth
						/>}
						<Button
							className="whitespace-no-wrap normal-case float-right"
							variant="contained"
							color="secondary"
							// disabled={!canBeSubmitted()}
							onClick={handleClose}
						>
							Send Answer
							</Button>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
				</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
