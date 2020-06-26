import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialstate = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/',
};

const authReducer = (state = initialstate, action) => {
	switch (action.type) {
		case actionTypes.authStart:
			return updatedObject(state, { error: null, loading: true });
		case actionTypes.authSuccess:
			return updatedObject(state, {
				token: action.idToken,
				userId: action.userId,
				error: null,
				loading: false,
			});
		case actionTypes.authFail:
			return updatedObject(state, { error: action.error, loading: false });
		case actionTypes.authLogout:
			return updatedObject(state, {
				token: null,
				userId: null,
			});
		case actionTypes.setAuthRedirectPath:
			return updatedObject(state, { authRedirectPath: action.path });
		case actionTypes.checkAuthenticated:
			return updatedObject(state, {});
		default:
			return state;
	}
};

export default authReducer;
