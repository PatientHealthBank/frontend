import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { createUserSettingsFirebase, setUserData } from './userSlice';
import { openLoading, closeLoading }  from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { toast } from "react-toastify";


export const submitRegister = (model) => async dispatch => {
	dispatch(openLoading())
	return jwtService
		.createUser(model)
		.then(user => {
			console.log(user)
			dispatch(setUserData(user));
			dispatch(closeLoading())
			return dispatch(registerSuccess());
		})
		.catch(error => {
			dispatch(closeLoading())
			if(error.serverError){
				toast.warn("Internal Server Error");
			}
			else
				return dispatch(registerError(error));
		});
};

export const registerWithFirebase = model => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}
	const { email, password, displayName } = model;

	return firebaseService.auth
		.createUserWithEmailAndPassword(email, password)
		.then(response => {
			dispatch(
				createUserSettingsFirebase({
					...response.user,
					displayName,
					email
				})
			);

			return dispatch(registerSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = ['auth/operation-not-allowed', 'auth/user-not-found', 'auth/user-disabled'];

			const emailErrorCodes = ['auth/email-already-in-use', 'auth/invalid-email'];

			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = {
				email: emailErrorCodes.includes(error.code) ? error.message : null,
				displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}

			return dispatch(registerError(response));
		});
};

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
		},
		registerError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
