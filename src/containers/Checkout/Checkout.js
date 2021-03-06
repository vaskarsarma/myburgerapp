import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

//import AUX from '../../hoc/Hoc/hoc-aux';

import { connect } from 'react-redux';

class Checkout extends Component {
	state = {
		ingredient: null,
		totalPrice: 0,
	};

	// componentWillMount() {
	// 	console.log(this.props);
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	//console.log(query.entries());
	// 	const ingredients = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		if (param[0] === 'price') price = +param[1];
	// 		else ingredients[param[0]] = +param[1];
	// 	}
	// 	console.log(JSON.stringify(ingredients));
	// 	this.setState({ ingredient: ingredients, totalPrice: price });
	// }

	cancelOrderHandler = () => {
		this.props.history.goBack();
	};

	continuePurchaseHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		let checkoutSummary = <Redirect to='/' />;
		// console.log('222' + this.props.ingt);
		if (this.props.ingt) {
			// console.log('222');
			checkoutSummary = (
				<div>
					<CheckoutSummary
						ingredient={this.props.ingt}
						cancelorder={this.cancelOrderHandler}
						continuepurchasing={this.continuePurchaseHandler}
					/>

					<Route
						path={this.props.match.path + '/contact-data'}
						component={ContactData}
						// render={props => (
						// 	<ContactData
						// 		ingredient={this.state.ingredient}
						// 		price={this.state.totalPrice}
						// 		{...props}
						// 	/>
						// )}
					/>
				</div>
			);
		}
		return checkoutSummary;
	}
}

const mapStateToProps = state => {
	return {
		ingt: state.brgr.ingredient,
	};
};

export default connect(mapStateToProps)(Checkout);
