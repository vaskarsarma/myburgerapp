import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialstate = {
	token: null,
	userId: null,
	error: null,
	loading: false,
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
		default:
			return state;
	}
};

export default authReducer;
