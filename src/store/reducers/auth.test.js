import AuthReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initialstate = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/',
};

describe('auth reducer', () => {
	it('Should return initial state', () => {
		expect(AuthReducer(undefined, {})).toEqual(initialstate);
	});

	it('Should return token and userid post auth success', () => {
		expect(
			AuthReducer(initialstate, {
				type: actionTypes.authSuccess,
				idToken: 'test token',
				userId: 'test id',
			}),
		).toEqual({
			token: 'test token',
			userId: 'test id',
			error: null,
			loading: false,
			authRedirectPath: '/',
		});
	});

	it('should not return token and userid if auth failed', () => {
		expect(
			AuthReducer(initialstate, {
				type: actionTypes.authFail,
				error: 'error',
			}),
		).toEqual({
			token: null,
			userId: null,
			error: 'error',
			loading: false,
			authRedirectPath: '/',
		});
	});
});
