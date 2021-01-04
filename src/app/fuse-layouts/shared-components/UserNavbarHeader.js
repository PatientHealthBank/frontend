import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import {  useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		},
		'& .logo-icon': {
			width: 100,
			height: 50,			
		},
	}
}));

function UserNavbarHeader(props) {
	const classes = useStyles();
	const settings = useSelector(({ fuse }) => fuse.settings.current);

	return (
		<AppBar
			position="static"
			color="transparent"
			elevation={0}
			classes={{ root: classes.root }}
			className="user relative flex flex-col items-center justify-center pt-8 pb-8 mb-8 z-0"
		>
					{!settings.layout.config.navbar.folded && 
					<>
			<img className="username logo-icon" src="assets/images/logos/LogoReduzida.png" alt="Logo"/>

			<Button
					component={Link}
					to="/appointment/new"
					className="username whitespace-no-wrap normal-case"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">New Appointment</span>
					<span className="flex sm:hidden">New Appointment</span>
				</Button>
				</>}
		</AppBar>
	);
}

export default UserNavbarHeader;
