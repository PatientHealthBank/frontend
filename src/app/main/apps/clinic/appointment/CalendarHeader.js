import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import connect from 'react-redux/es/connect/connect';
import { selectMainThemeDark } from 'app/store/fuse/settingsSlice';
import TextField from '@material-ui/core/TextField';

/* eslint-disable react/jsx-no-bind */
const styles = theme => ({
	root: {
		// backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
		backgroundColor: '#F0F0Ff',
		color: '#000',
		backgroundSize: 'cover',
		backgroundPosition: '0 50%',
		backgroundRepeat: 'no-repeat',
		'&:before': {
			content: "''",
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			zIndex: 1
		},
		'&.Jan': {
			// backgroundImage: "url('/assets/images/calendar/winter.jpg')",
			backgroundPosition: '0 85%'
		},
		'&.Feb': {
			// backgroundImage: "url('/assets/images/calendar/winter.jpg')",
			backgroundPosition: '0 85%'
		},
		'&.Mar': {
			// backgroundImage: "url('/assets/images/calendar/spring.jpg')",
			backgroundPosition: '0 40%'
		},
		'&.Apr': {
			// backgroundImage: "url('/assets/images/calendar/spring.jpg')",
			backgroundPosition: '0 40%'
		},
		'&.May': {
			// backgroundImage: "url('/assets/images/calendar/spring.jpg')",
			backgroundPosition: '0 40%'
		},
		'&.Jun': {
			// backgroundImage: "url('/assets/images/calendar/summer.jpg')",
			backgroundPosition: '0 80%'
		},
		'&.Jul': {
			// backgroundImage: "url('/assets/images/calendar/summer.jpg')",
			backgroundPosition: '0 80%'
		},
		'&.Aug': {
			// backgroundImage: "url('/assets/images/calendar/summer.jpg')",
			backgroundPosition: '0 80%'
		},
		'&.Sep': {
			// backgroundImage: "url('/assets/images/calendar/autumn.jpg')",
			backgroundPosition: '0 40%'
		},
		'&.Oct': {
			// backgroundImage: "url('/assets/images/calendar/autumn.jpg')",
			backgroundPosition: '0 40%'
		},
		'&.Nov': {
			// backgroundImage: "url('/assets/images/calendar/autumn.jpg')",
			backgroundPosition: '0 40%'
		},
		'&.Dec': {
			// backgroundImage: "url('/assets/images/calendar/winter.jpg')",
			backgroundPosition: '0 85%'
		}
	}
});

const viewNamesObj = {
	month: {
		title: 'Month',
		icon: 'view_module'
	},
	week: {
		title: 'Week',
		icon: 'view_week'
	},
	day: {
		title: 'Day',
		icon: 'view_day'
	}
};


class CalendarHeader extends Toolbar {
	viewButtons() {
		const viewNames = this.props.views;

		if (viewNames.length > 1) {
			return viewNames.map(name => {
				if (viewNamesObj[name]) {
					console.log(viewNamesObj[name]);
					return (<Tooltip title={viewNamesObj[name].title} key={name}>
						<div>
							<FuseAnimate animation="transition.expandIn" delay={500}>
								<IconButton
									color='primary'
									aria-label={name}
									onClick={() => this.props.onView(name)}
								// disabled={view === name}
								>
									<Icon>{viewNamesObj[name].icon}</Icon>
								</IconButton>
							</FuseAnimate>
						</div>
					</Tooltip>);
				}
				return null;
			});
		}
		return null;
	}

	render() {
		const { classes, mainThemeDark, label, date } = this.props;

		return (
			<div className={clsx(classes.root, 'flex h-200 min-h-200 relative', moment(date).format('MMM'))}>
				<div className="flex flex-1 flex-col p-12 justify-between z-10 container">
					<div className="flex flex-col items-center justify-between sm:flex-row">
						<div className="flex items-center my-16 sm:mb-0">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Icon className="text-32 mx-12">today</Icon>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography variant="h6">Appointment Book</Typography>
							</FuseAnimate>
						</div>
						<div className="flex items-center">
							{this.viewButtons()}
						</div>
					</div>
					<div className="flex flex-1 flex-col p-12 justify-between z-10 container max-w-300">
						<div className="flex flex-col items-center justify-between sm:flex-row">
							<TextField
								required
								label="Clinic"
								autoFocus
								id="clinic"
								name="clinic"
								// value={form.sku}
								// onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

							<TextField
								className="ml-16"
								label="Professional"
								id="professional"
								name="professional"
								// value={form.quantity}
								// onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</div>
					</div>
					<FuseAnimate delay={500}>
						<div className="flex items-center justify-center">
							<Tooltip title="Previous">
								<IconButton
									color='primary'
									aria-label="Previous"
									onClick={this.navigate.bind(null, navigate.PREVIOUS)}
								>
									<Icon>
										{mainThemeDark.direction === 'ltr' ? 'chevron_left' : 'chevron_right'}
									</Icon>
								</IconButton>
							</Tooltip>
							<Typography variant="h6">{label}</Typography>
							<Tooltip title="Next">
								<IconButton color='primary' aria-label="Next" onClick={this.navigate.bind(null, navigate.NEXT)}>
									<Icon>
										{mainThemeDark.direction === 'ltr' ? 'chevron_right' : 'chevron_left'}
									</Icon>
								</IconButton>
							</Tooltip>
						</div>
					</FuseAnimate>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		mainThemeDark: selectMainThemeDark(state)
	};
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CalendarHeader));
