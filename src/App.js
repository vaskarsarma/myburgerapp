import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';

import * as actions from './store/actions/index';

class App extends Component {
	componentDidMount() {
		this.props.checkAuthnonLoad();
	}

	render() {
		const postLoginRouter = (
			<Switch>
				<Route path='/checkout' component={Checkout} />
				<Route path='/orders' component={Orders} />
				<Route path='/logout' component={Logout} />
				<Route path='/' component={BurgerBuilder} />
			</Switch>
		);

		const preLoginRouter = (
			<Switch>
				<Route path='/auth' component={Auth} />
				<Route path='/' component={BurgerBuilder} />
			</Switch>
		);

		return (
			<div>
				<Layout>
					{this.props.isAutheTicated ? postLoginRouter : preLoginRouter}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAutheTicated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		checkAuthnonLoad: () => dispatch(actions.checkAuthenticated()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
