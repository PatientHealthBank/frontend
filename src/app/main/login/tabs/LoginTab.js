import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitLogin, loginSuccess } from 'app/auth/store/loginSlice';

function LoginTab(props) {
	const dispatch = useDispatch();

	const {doctorId, clinicId, hour} = props
	const login = useSelector(({ auth }) => auth.login);

	const [isFormValid, setIsFormValid] = useState(false);
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
		checkedF: true,
		checkedG: true,
	  });
	const [showPassword, setShowPassword] = useState(false);

	const formRef = useRef(null);
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	  };

	useEffect(() => {
		if (login.error && (login.error.email || login.error.password)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			disableButton();
		}
	}, [login.error]);
	var loginField = localStorage.getItem('login');
	var passField = localStorage.getItem('pass');;
	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {

		dispatch(loginSuccess())
		if(state.checkedB){
			localStorage.setItem('login', model.email);
			localStorage.setItem('pass', model.password);
		}
		dispatch(submitLogin(model));
		// if(!doctorId)
		// {
		// 	props.history.push(`/dashboard`);
		// }
		// else
		// {
		// 	props.history.push(`/confirm-appointment/${clinicId}/${doctorId}/${hour}`);
		// }
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="email"
					label="Username/Email"
					value={loginField}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password"
					label="Password"
					value={passField}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						className: 'pr-2',
						type: showPassword ? 'text' : 'password',
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									<Icon className="text-20" color="action">
										{showPassword ? 'visibility' : 'visibility_off'}
									</Icon>
								</IconButton>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
					<FormControlLabel
						control={
						<Checkbox
							checked={state.checkedB}
							onChange={handleChange}
							name="checkedB"
							color="primary"
						/>
						}
						label="Remember me"
					/>
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="LOG IN"
					disabled={!isFormValid}
					value="legacy"
				>
					Login
				</Button>
			</Formsy>
			
		</div>
	);
}

export default withRouter(LoginTab);
