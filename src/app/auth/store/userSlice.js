import { createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { listVaccines } from 'app/main/pages/profile/store/vaccinesSlice';
import { listAllergies } from 'app/main/pages/profile/store/allergiesSlice';
import { listMedicines } from 'app/main/pages/profile/store/medicinesSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import {
	getEvents
} from 'app/main/apps/calendar/store/eventsSlice';


export const setUserDataAuth0 = tokenData => async dispatch => {
	const user = {
		role: ['admin'],
		from: 'auth0',
		data: {
			displayName: tokenData.username || tokenData.name,
			photoURL: tokenData.picture,
			email: tokenData.email,
			settings:
				tokenData.user_metadata && tokenData.user_metadata.settings ? tokenData.user_metadata.settings : {},
			shortcuts:
				tokenData.user_metadata && tokenData.user_metadata.shortcuts ? tokenData.user_metadata.shortcuts : []
		}
	};

	return dispatch(setUserData(user));
};

export const setUserDataFirebase = (user, authUser) => async dispatch => {
	if (
		user &&
		user.currentUser &&
		user.currentUser.settings &&
		user.currentUser.settings.theme &&
		user.currentUser.settings.layout &&
		user.currentUser.settings.layout.style
	) {
		// Set user data but do not update
		return dispatch(setUserData(user));
	}

	// Create missing user settings
	return dispatch(createUserSettingsFirebase(authUser));
};

export const createUserSettingsFirebase = authUser => async (dispatch, getState) => {
	const guestUser = getState().auth.user;
	const fuseDefaultSettings = getState().fuse.settings.defaults;
	const { currentUser } = firebase.auth();

	/**
	 * Merge with current Settings
	 */
	const user = _.merge({}, guestUser, {
		uid: authUser.uid,
		from: 'firebase',
		role: ['admin'],
		currentUser: {
			displayName: authUser.displayName,
			email: authUser.email,
			settings: { ...fuseDefaultSettings }
		}
	});
	currentUser.updateProfile(user.currentUser);

	dispatch(updateUserData(user));

	return dispatch(setUserData(user));
};

export const setUserData = user => async (dispatch, getState) => {
	var reducer = getState().confirmAppointment
	var confirmAppointment = reducer ? reducer.state : false
	/*
		You can redirect the logged-in user to a specific route depending on his role
		 */
	if (user.role.includes('patient')) {

		if (confirmAppointment == false || !confirmAppointment.jobDay) {
			history.location.state = {
				redirectUrl: "dashboard"
			};
		}
		else{
			history.location.state = {
				redirectUrl: "confirm-appointment" 
			};
		}
	}
	else if (user.role.includes('provider')) {
		history.location.state = {
			redirectUrl: "apps/provider/patients"
		};
	}
	else if (user.role.includes('clinic')) {
		history.location.state = {
			redirectUrl: "apps/clinic/appointment" // for example 'apps/academy'
		};
	}
	else {
		history.location.state = {
			redirectUrl: "pages/profile" // for example 'apps/academy'
		};
	}
	/*
	Set User Settings
	 */
	dispatch(setDefaultSettings(user.role));

	dispatch(setUser(user));
};

export const updateUserSettings = settings => async (dispatch, getState) => {
	const oldUser = getState().auth.user;
	const user = _.merge({}, oldUser, { data: { settings } });

	dispatch(updateUserData(user));

	return dispatch(setUserData(user));
};

export const updateUserShortcuts = shortcuts => async (dispatch, getState) => {
	const { user } = getState().auth;
	const newUser = {
		...user,
		currentUser: {
			...user.currentUser,
			shortcuts
		}
	};

	dispatch(updateUserData(user));

	return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	history.push({
		pathname: '/'
	});

	switch (user.from) {
		case 'firebase': {
			firebaseService.signOut();
			break;
		}
		case 'auth0': {
			auth0Service.logout();
			break;
		}
		default: {
			jwtService.logout();
		}
	}

	dispatch(setInitialSettings());

	dispatch(userLoggedOut());
};

export const setCurrentUser = currentUser => (dispatch, getState) =>{
	var state = getState().auth.user
	var newCurrentUser = currentUser;
	var dependents = state.dependents.filter(dependent=> dependent.id != newCurrentUser.id)
	var oldCurrentUser = state.currentUser;
	dependents.push(oldCurrentUser);
	dispatch(setUser({...state, dependents, currentUser: newCurrentUser}))
	dispatch(listVaccines())
	dispatch(listAllergies())
	dispatch(listMedicines())
	dispatch(getEvents())
}

export const updateUserData = user => async (dispatch, getState) => {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}
	switch (user.from) {
		case 'firebase': {
			firebaseService
				.updateUserData(user)
				.then(() => {
					dispatch(showMessage({ message: 'User data saved to firebase' }));
				})
				.catch(error => {
					dispatch(showMessage({ message: error.message }));
				});
			break;
		}
		case 'auth0': {
			auth0Service
				.updateUserData({
					settings: user.currentUser.settings,
					shortcuts: user.currentUser.shortcuts
				})
				.then(() => {
					dispatch(showMessage({ message: 'User data saved to auth0' }));
				})
				.catch(error => {
					dispatch(showMessage({ message: error.message }));
				});
			break;
		}
		default: {
			jwtService
				.updateUserData(user)
				.then(() => {
					dispatch(showMessage({ message: 'User data saved with api' }));
				})
				.catch(error => {
					dispatch(showMessage({ message: error.message }));
				});
			break;
		}
	}
};

const initialState = {
	role: [], // guest
	currentUser: {
		displayName: 'John Doe',
		photoURL: 'assets/images/avatars/Velazquez.jpg',
		email: 'johndoe@withinpixels.com',
		shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	},
	dependents:[]
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		userLoggedOut: (state, action) => initialState,
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
