import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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

const useStyles = makeStyles(theme => ({
	root: {
		width: 350
	},
	ratingSize: {
		'& > * + *': {
			marginTop: theme.spacing(3)
		},
		'& .MuiSvgIcon-root': {
			width: '2.5em',
			height: '2.5em'
		},		
		marginLeft:'35px'
	},
	listItemText: {
		fontSize: '1.2em',//Insert your required size
	}
}));

function Widget3(props) {

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

	return (
		<Card className="w-full rounded-8 shadow-1">
			<div className="mb-32 p-16 pb-0 flex flex-row flex-wrap items-end">
				<div className="">
					<Typography className="h1 font-300">Stop/Reduce pain</Typography>
					<Typography className="h3" color="textSecondary">
						Select the option that best describes your pain level today
					</Typography>
				</div>
			</div>

			<div className={classes.ratingSize}>
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
			</div>
		</Card>
	);
}

export default React.memo(Widget3);
