import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'app/auth/store/loginSlice';
const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function ResetPasswordPage(props) {
	const classes = useStyles();
	const routeParams = useParams();
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	console.log('user', user);
	console.log('route', routeParams);
	const { form, handleChange, setForm } = useForm(null);

	useDeepCompareEffect(() => {
		function updateResetPasswordState() {}

		updateResetPasswordState();
	}, [dispatch, routeParams]);

	function isFormValid() {
		return (
			form.currentUser.email.length > 0 &&
			form.password?.length > 0 &&
			form.password?.length > 3 &&
			form.password === form.passwordConfirm
		);
	}
	useEffect(() => {
		if(user.updateDate){
			props.history.push(`/dashboard`);

		}
		if ((user && !form) || (user && form && user.id !== form.id)) {
			setForm(user);
		}
	}, [form, user, setForm]);

	function handleSubmit(form) {
		if (form) {
			dispatch(updateUser(form));

		}
	}
	return (
		form && (
			<div
				className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}
			>
				<div className="flex flex-col items-center justify-center w-full">
					<FuseAnimate animation="transition.expandIn">
						<Card className="w-full max-w-384 rounded-8">
							<CardContent className="flex flex-col items-center justify-center p-32">
								<img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" />

								<Typography variant="h6" className="mt-16 mb-32">
									RESET YOUR PASSWORD
								</Typography>

								<form name="resetForm" noValidate className="flex flex-col justify-center w-full">
									<TextField
										className="mb-16"
										label="Email"
										autoFocus
										type="email"
										name="email"
										value={form.currentUser.email}
										onChange={handleChange}
										variant="outlined"
										required
										fullWidth
									/>

									<TextField
										className="mb-16"
										label="Password"
										type="password"
										name="password"
										value={form.password}
										onChange={handleChange}
										variant="outlined"
										required
										fullWidth
									/>

									<TextField
										className="mb-16"
										label="Password (Confirm)"
										type="password"
										name="passwordConfirm"
										value={form.passwordConfirm}
										onChange={handleChange}
										variant="outlined"
										required
										fullWidth
									/>

									<Button
										variant="contained"
										color="primary"
										className="w-224 mx-auto mt-16"
										aria-label="Reset"
										disabled={!isFormValid()}
										onClick={() => handleSubmit(form)}
									>
										RESET MY PASSWORD
									</Button>
								</form>

								<div className="flex flex-col items-center justify-center pt-32 pb-24">
									<Link className="font-medium" to="/pages/auth/login">
										Go back to login
									</Link>
								</div>
							</CardContent>
						</Card>
					</FuseAnimate>
				</div>
			</div>
		)
	);
}

export default ResetPasswordPage;
