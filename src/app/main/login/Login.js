import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { Link, useParams } from 'react-router-dom';
import LoadingModal from 'app/fuse-layouts/shared-components/loadingModal/LoadingModal';
import clsx from 'clsx';
import React from 'react';
import LoginTab from './tabs/LoginTab';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.login.light} 0%, ${darken(
			theme.palette.login.light,
			0.5
		)} 100%)`,
		color: theme.palette.login.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.login.light} 0%, ${darken(
			theme.palette.login.light,
			0.5
		)} 100%)`,
		color: theme.palette.login.contrastText
	}
}));

function Login() {
	const classes = useStyles();
	const routeParams = useParams();
	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<LoadingModal />
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center'
						)}
						square
						elevation={0}
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<img className="logo-icon w-250" src="assets/images/logos/PatientHealthBank_Logo.png" alt="logo" />

							<LoginTab doctorId={routeParams.doctorId} clinicId={routeParams.clinicId} hour={routeParams.hour} />
						</CardContent>

						<div className="flex flex-col items-center justify-center pb-32">
							<div>
								<span className="font-medium mr-8">Don't have an account?</span>
								<Link className="font-medium" to="/register">
									Register here
								</Link>
							</div>
						</div>
					</Card>

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
					>
						<div className="max-w-320">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Welcome to <br />
								Patient Health Bank.
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle1" color="inherit" className="mt-32">
									Please sign in to book your appointment.
									You must be a member to use this function.
									If you are not a member you can learn more about Patient Health Bank here or you can sign up and register here.
								</Typography>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Login;
