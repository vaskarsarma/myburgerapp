import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.authStart,
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.authSuccess,
		idToken: idToken,
		userId: userId,
	};
};

export const authFail = error => {
	return {
		type: actionTypes.authFail,
		error: error,
	};
};

export const logOut = () => {
	return {
		type: actionTypes.authLogout,
	};
};

export const checkAuthTimeOut = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logOut());
		}, expirationTime * 1000);
	};
};

export const autheticate = (email, password, isSignUP) => {
	console.log(email, password);
	return dispatch => {
		//Axios call
		dispatch(authStart());

		const data = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjfl4yEBRfztnfSYRokVmMv6grdUWRDMg';

		if (!isSignUP) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjfl4yEBRfztnfSYRokVmMv6grdUWRDMg';
		}

		axios
			.post(url, data)
			.then(response => {
				console.log(response);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeOut(response.data.expiresIn));
			})
			.catch(error => {
				dispatch(authFail(error.response.data.error));
			});
	};
};
