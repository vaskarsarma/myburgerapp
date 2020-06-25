import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/index';

class Logout extends Component {
	componentDidMount() {
		this.props.onLogout();
		this.props.onSetAuthRedirectPath();
	}

	render() {
		return <Redirect to='/' />;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(authActions.logOut()),
		onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/')),
	};
};

export default connect(
	null,
	mapDispatchToProps,
)(Logout);
