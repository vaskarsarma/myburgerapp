import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	state = {
		ingredient: {
			salad: 1,
			meat: 1,
			bacon: 1,
			cheese: 1,
		},
	};

	render() {
		return <CheckoutSummary ingredient={this.state.ingredient} />;
	}
}

export default Checkout;
