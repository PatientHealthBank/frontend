import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const submitLogin = ({ email, password }) => async dispatch => {
	dispatch(openLoading());
	return jwtService
		.signInWithEmailAndPassword(email, password)
		.then(user => {
			dispatch(setUserData(user));
			dispatch(closeLoading());
			return dispatch(loginSuccess());
		})
		.catch(error => {
			console.log(error);
			dispatch(closeLoading());
			return dispatch(loginError(error));
		});
};

export const updateUser = user => async dispatch => {
	console.log('atualizando user', user);
	dispatch(openLoading());

	return jwtService
		.updateUser(user)
		.then(result => {
			console.log('resultado do update',result)
			if (result) {
				return dispatch(submitLogin({ email: user.email, password: user.currentUser.password }));
			}
		})
		.catch(error => {
			console.log('deu erro',error)

		});
};

export const submitLoginWithFireBase = ({ username, password }) => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}
	return firebaseService.auth
		.signInWithEmailAndPassword(username, password)
		.then(() => {
			return dispatch(loginSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = [
				'auth/email-already-in-use',
				'auth/invalid-email',
				'auth/operation-not-allowed',
				'auth/user-not-found',
				'auth/user-disabled'
			];
			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = {
				username: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}
			console.log(response);

			return dispatch(loginError(response));
		});
};

const initialState = {
	success: false,
	firstAccess: false,
	error: {
		username: null,
		password: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
		},
		loginError: (state, action) => {
			console.log(action.payload);
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
