import _ from '@lodash';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LabelsDialog from '../../../my-diary/dialogs/labels/LabelsDialog';
import NoteDialog from '../../../my-diary/dialogs/note/NoteDialog';
import NewNoteSpecialty from '../../../my-diary/NewNoteSpecialty';
import clsx from 'clsx';
import NoteList from '../../../my-diary/NoteList';
import Switch from '@material-ui/core/Switch';
import React, { useEffect, useRef, useState } from 'react';
import Comments from '../Comments';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { useSelector } from 'react-redux';
import { openLabelsDialog, selectLabels } from '../../../my-diary/store/labelsSlice';



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
	disabled,
	readOnly,
	IconContainerComponent,
	onChange
}) => {
	const classes = useStyle({ color });
	return <Rating className={classes.ratingDepressed}
		name={name}
		defaultValue={defaultValue}
		disabled={disabled}
		readOnly={readOnly}
		getLabelText={getLabelText}
		IconContainerComponent={IconContainerComponent}
		onChange={onChange}
	>{children}</Rating>;
};

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
function IconContainer(props) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}

function AppointmentTopics(props) {
    const routeParams = {readOnly : false}
    routeParams.readOnly = false
    const classes = useStyles(props);
    const [rating, setRating] = useState(4);
    const [state, setState] = React.useState({
        MyDiagnosis: true,
        HowcanIavoidsurgery: false,
        Possibilityofsurgery: true,
        Whathappensaftermyprocedure: true,
        Myexerciseroutine: true,
        Returntosport: false,
        Alteredsleepcycle: false,
        Fearofreinjury: true,
        Ihurtaftermylastvisit: true,
        GoodvsBadpain: false,
        Congestion: false,
    });
	const handleChangeCheckBox = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};    
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
    const labels = useSelector(selectLabels);
	const [color, setColor] = useState("#123123");;
    const label = labels.find(item=> item.name == props.topics.specialty.description) 
    console.log(label)

    return (
        <div>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={12}>
										<Grid container spacing={3}>
											<Grid item xs={12} sm={6}>
													<h2>My Notes</h2>
													{!routeParams.readOnly &&
														<NewNoteSpecialty description="Take a note"
															specialties={[label?.handle]} />}
                                                    <NoteList readOnly={routeParams.readOnly}
                                                    paramsLabel={{
														params: {
															id: "labels",
                                                            labelHandle: label?.handle,
															labelId: label?.id,                             
														}
													}}
                                                    />
													<NoteDialog />
													<LabelsDialog />
											</Grid>
											<Grid item xs={12} sm={6}>

													<h2> Provider Notes </h2>
													{routeParams.readOnly &&
														<NewNoteSpecialty description="Take a note"
															specialties={['sportsmedicine', 'providernote']} />}
													<NoteList readOnly={!routeParams.readOnly} paramsLabel={{
														params: {
															id: "labels",
                                                            labelHandle: label?.handle,
															labelId: label?.id,                             
														}
													}} />
													<NoteDialog />
													<LabelsDialog />

											</Grid>

										</Grid>
									</Grid>

									<Grid item xs={12} sm={5}>
										<h2> Main Topics</h2> <br />
										<Grid container spacing={3} direction="column">
											<Grid container spacing={3} >
												<Grid item xs={12} sm={6}>
													<FormControlLabel
														control={
															<Switch
																checked={state.Mydiagnosis}
																onChange={(event) => routeParams.readOnly || handleChangeCheckBox(event)}
																name="Mydiagnosis"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label="Diagnosis"
													/>
													<FormControlLabel
														control={
															<Switch
																checked={state.Possibilityofsurgery}
																onChange={(event) => routeParams.readOnly || handleChangeCheckBox(event)}
																name="Possibilityofsurgery"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label="Possibility of surgery"
													/>
													<FormControlLabel
														control={
															<Switch
																checked={state.HowcanIavoidsurgery}
																onChange={(event) => routeParams.readOnly || handleChangeCheckBox(event)}
																name="HowcanIavoidsurgery"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label="How can I avoid surgery"
													/>
													<FormControlLabel
														control={
															<Switch
																checked={state.Whathappensaftermyprocedure}
																onChange={(event) => routeParams.readOnly || handleChangeCheckBox(event)}
																name="Whathappensaftermyprocedure"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label="What happens after my procedure"
													/>
													<FormControlLabel
														control={
															<Switch
																checked={state.Myexerciseroutine}
																onChange={(event) => routeParams.readOnly || handleChangeCheckBox(event)}
																name="Myexerciseroutine"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label="Exercise routine"
													/>
												</Grid>
												<Grid item xs={12} sm={6} direction="column">
													<FormControlLabel
														control={
															<Switch
																checked={state.Returntosport}
																onChange={(event) => routeParams.readOnly || handleChangeCheckBox(event)}
																name="Returntosport"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label="Return to sport"
													/>
													<FormControlLabel
														control={
															<Switch
																checked={state.Alteredsleepcycle}
																onChange={(event) => routeParams.readOnly || handleChangeCheckBox(event)}
																name="Alteredsleepcycle"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label="Altered sleep cycle"
													/>
													<FormControlLabel
														control={
															<Switch
																checked={state.Fearofreinjury}
																onChange={(event) => routeParams || handleChangeCheckBox(event)}
																name="Fearofreinjury"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label="Fear of reinjury"
													/>
													<FormControlLabel
														control={
															<Switch
																checked={state.Ihurtaftermylastvisit}
																onChange={(event) => routeParams.readOnly || handleChangeCheckBox(event)}
																name="Ihurtaftermylastvisit"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label=" I hurt after my last visit"
													/>
													<FormControlLabel
														control={
															<Switch
																checked={state.GoodvsBadpain}
																onChange={(event) => routeParams.readOnly || handleChangeCheckBox(event)}
																name="GoodvsBadpain"
																inputProps={{ 'aria-label': 'secondary checkbox' }}

															/>
														}
														label="Good vs Bad pain"
													/>
												</Grid>
											</Grid>
											<Grid item xs={10} sm={10} container justify="center" alignItems="center">
												<FormControlLabel
													className={classes.ratingSize}
													control={
														<StyledRating
															color={color}
															name="painFlareUp"
															defaultValue={rating}
															readOnly={routeParams.readOnly}
															onChange={(event, newValue) => {
																onRatingChange(newValue);
															}}
															getLabelText={(value) => customIcons[value].label}
															IconContainerComponent={IconContainer}
														/>
													}
													labelPlacement={'top'}
													label="Pain flare up (select your pain level) "
												/>
												{!routeParams.readOnly &&
													<NewNoteSpecialty description="Please describe what you were doing when you experienced pain (i.e. Shoveling snow, playing with my kids, sports (which one), doing laundry, gardening, or  describe)"
														specialties={[label?.handle, 'pain']} />}
											</Grid>
										</Grid>



									</Grid>
								</Grid>

							</div>
    );
}

export default AppointmentTopics;
