import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function RegisterTab(props) {
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);

	// eslint-disable-next-line 
	const [isFormValid, setIsFormValid] = useState(false);
	const [state, setState] = React.useState({
		AcceptTerms: false,
	});
	const formRef = useRef(null);
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
	}, [register.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	const enableButton = (AcceptTerms) => {
		console.log(AcceptTerms)
		if(AcceptTerms){
			setIsFormValid(true);
		}
		else{
			setIsFormValid(false);
		}
	}

	function handleSubmit(model) {
		model.AcceptTerms = state.AcceptTerms;
		dispatch(submitRegister(model));
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={()=> enableButton(state.AcceptTerms)}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="fullName"
					label="Full Name"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				{/* <TextFieldFormsy
					className="mb-16"
					type="text"
					name="userName"
					label="User Name"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/> */}

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="email"
					label="Email"
					validations="isEmail"
					validationErrors={{
						isEmail: 'Please enter a valid email'
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
					// validations="equalsField:password-confirm"
					// validationErrors={{
					// 	equalsField: 'Passwords do not match'
					// }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
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
					name="password-confirm"
					label="Confirm Password"
					validations="equalsField:password"
					validationErrors={{
						equalsField: 'Passwords do not match'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Grid container className="mb-16">
					<Grid item xs>
						<TextFieldFormsy
							type="date"
							name="birthDate"
							label="BirthDate"
							className="mr-8"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">

									</InputAdornment>
								)
							}}
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							required
						/>
					</Grid>
					<Grid item xs>
						<TextFieldFormsy
							type="text"
							name="SSN"
							label="SSN (Last 4 digits)"
							maxLength={4}
							
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">

									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					</Grid>
				</Grid>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="zipCode"
					label="Zip Code"
					variant="outlined"
					required
				/>

				<FormControlLabel
					control={
						<Checkbox
							checked={state.AcceptTerms}
							onChange={(event)=> {handleChange(event); enableButton(event.target.checked) }}
							name="AcceptTerms"
							color="primary"
						/>
					}
					label="I read and accept terms and conditions"
				/>
				<Button
					type="submit"
					variant="contained"
					color="seccondary"
					disabled={!isFormValid}
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					value="legacy"
				>
					Register
				</Button>
			</Formsy>
		</div>
	);
}

export default RegisterTab;
