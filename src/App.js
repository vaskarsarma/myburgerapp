import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';

import * as actions from './store/actions/index';

import asyncComponent from '../src/hoc/asyncComponent/asyncComponent';

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
});

const asyncOrder = asyncComponent(() => {
	return import('./containers/Orders/Orders');
});

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout');
});

class App extends Component {
	componentDidMount() {
		this.props.checkAuthnonLoad();
	}

	render() {
		let routers = (
			<Switch>
				<Route path='/auth' component={asyncAuth} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		);

		if (this.props.isAutheTicated) {
			// console.log('111 ', this.props.isAutheTicated);
			routers = (
				<Switch>
					<Route path='/checkout' component={asyncCheckout} />
					<Route path='/orders' component={asyncOrder} />
					<Route path='/logout' component={Logout} />
					<Route path='/auth' component={asyncAuth} />
					<Route path='/' exact component={BurgerBuilder} />
					<Redirect to='/' />
				</Switch>
			);
		}

		return (
			<div>
				<Layout>
					{routers}
					{/* <Switch>
						<Route path='/auth' component={Auth} />
						<Route path='/checkout' component={Checkout} />
						<Route path='/orders' component={Orders} />
						<Route path='/logout' component={Logout} />
						<Route path='/' exact component={BurgerBuilder} />
						<Redirect to='/' />
					</Switch> */}
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

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(App),
);
