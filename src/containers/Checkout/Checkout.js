import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

//import AUX from '../../hoc/Hoc/hoc-aux';

class Checkout extends Component {
	state = {
		ingredient: {
			salad: 1,
			meat: 1,
			bacon: 1,
			cheese: 1,
		},
	};

	componentDidMount() {
		console.log(this.props);
		const query = new URLSearchParams(this.props.location.search);
		//console.log(query.entries());
		const ingredients = {};
		for (let param of query.entries()) {
			ingredients[param[0]] = +param[1];
		}
		console.log(JSON.stringify(ingredients));
		this.setState({ ingredient: ingredients });
	}

	cancelOrderHandler = () => {
		this.props.history.goBack();
	};

	continuePurchaseHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredient={this.state.ingredient}
					cancelorder={this.cancelOrderHandler}
					continuepurchasing={this.continuePurchaseHandler}
				/>

				<Route
					path={this.props.match.path + '/contact-data'}
					component={ContactData}
				/>
			</div>
		);
	}
}

export default Checkout;
