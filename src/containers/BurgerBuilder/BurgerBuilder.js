import React, { Component } from 'react';
//import { Router, Redirect } from 'react-router-dom';

import AUX from '../../hoc/Hoc/hoc-aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

//import Checkout from '../Checkout/Checkout';

import { connect } from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';

import * as burgerBuilder from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		//ingredient: null,
		//basePrice: 4,
		//totalPrice: 4,
		//puchasable: false,
		puchasing: false,
		//loading: false,
		//error: false,
	};

	componentWillMount() {
		console.log(this.props);
		this.props.onInitiateIngredient();
		// axios
		// 	.get(`/ingredient.json`)
		// 	.then(response => {
		// 		this.setState({ ingredient: response.data });
		// 		this.updatePurchaseHandler(this.state.ingredient);
		// 		this.getUpdatedPrice(this.state.ingredient);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 		this.setState({ error: true });
		// 	});
	}

	// getUpdatedPrice = ingredients => {
	// 	const tPrice = Object.keys(ingredients)
	// 		.map(ingKey => {
	// 			console.log(
	// 				ingKey +
	// 					' : ' +
	// 					INGREDIENT_PRICE[ingKey] +
	// 					' : ' +
	// 					ingredients[ingKey],
	// 			);
	// 			return INGREDIENT_PRICE[ingKey] * ingredients[ingKey];
	// 		})
	// 		.reduce((tprice, el) => tprice + el, this.state.basePrice);
	// 	console.log(tPrice);
	// 	this.setState({ totalPrice: tPrice });
	// };

	updatePurchaseHandler = ingredients => {
		const sum = Object.keys(ingredients)
			.map(ingKey => {
				return ingredients[ingKey];
			})
			.reduce((sum, el) => sum + el, 0);

		return sum > 0;
	};

	// addIngredientHandler = type => {
	// 	const ingCurrentCount = this.state.ingredient[type];
	// 	const ingUpdatedCount = ingCurrentCount + 1;
	// 	const newState = { ...this.state.ingredient };
	// 	newState[type] = ingUpdatedCount;

	// 	const oldPrice = this.state.totalPrice;
	// 	const ingredientPrice = INGREDIENT_PRICE[type];
	// 	const updatedPrice = oldPrice + ingredientPrice;

	// 	this.setState({
	// 		totalPrice: updatedPrice,
	// 		ingredient: newState,
	// 	});

	// 	this.updatePurchaseHandler(newState);
	// };

	// removeIngredientHandler = type => {
	// 	const ingCurrentCount = this.state.ingredient[type];

	// 	if (ingCurrentCount <= 0) return;

	// 	const ingUpdatedCount = ingCurrentCount >= 0 ? ingCurrentCount - 1 : 0;
	// 	const newState = { ...this.state.ingredient };
	// 	newState[type] = ingUpdatedCount;

	// 	const oldPrice = this.state.totalPrice;
	// 	const ingredientPrice = INGREDIENT_PRICE[type];
	// 	const updatedPrice = oldPrice - ingredientPrice;

	// 	this.setState({
	// 		totalPrice: updatedPrice > 4 ? updatedPrice : 4,
	// 		ingredient: newState,
	// 	});

	// 	this.updatePurchaseHandler(newState);
	// };

	purchasingHandler = () => {
		this.setState({ puchasing: true });
	};

	cancelPurchaseHandler = () => {
		this.setState({ puchasing: false });
	};

	continuePurchaseHandler = () => {
		// const queryParams = [];
		// for (let i in this.props.ingnt) {
		// 	queryParams.push(
		// 		encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingnt[i]),
		// 	);
		// }
		// queryParams.push('price=' + this.props.tPrice);
		// const queryStr = queryParams.join('&');

		// this.props.history.push({
		// 	pathname: '/Checkout',
		// 	search: '?' + queryStr,
		// });

		this.props.history.push('/Checkout');
	};

	render() {
		const disabledInfo = { ...this.props.ingnt };
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let burger = this.props.error ? (
			<p style={{ textAlign: 'center' }}>Error loading ingredient!!!</p>
		) : (
			<Spinner />
		);

		let orderSummary = null;

		console.log(this.props.ingnt);

		if (this.props.ingnt && this.props.tPrice > 0) {
			burger = (
				<AUX>
					<Burger ingredient={this.props.ingnt} />
					<BurgerControls
						addIngredient={this.props.onAddIngredient}
						removeIngredient={this.props.onRemoveIngredient}
						disabled={disabledInfo}
						totalprice={this.props.tPrice}
						puchasable={this.updatePurchaseHandler(this.props.ingnt)}
						ordered={this.purchasingHandler}
					/>
				</AUX>
			);

			orderSummary = (
				<OrderSummary
					totalPrice={this.props.tPrice}
					cancelOrder={this.cancelPurchaseHandler}
					continuePurchase={this.continuePurchaseHandler}
					ingredient={this.props.ingnt}
				></OrderSummary>
			);
		}

		// if (this.state.loading) {
		// 	orderSummary = <Spinner />;
		// }

		console.log('Burger Builder : show ' + this.state.puchasing);

		return (
			<AUX>
				<Modal
					show={this.state.puchasing}
					cancelPurchase={this.cancelPurchaseHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</AUX>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingnt: state.ingredient,
		//bPrice: state.basePrice,
		tPrice: state.totalPrice,
		//puchasable: state.puchasable,
		error: state.error,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddIngredient: ingName => dispatch(burgerBuilder.addIngredient(ingName)),
		onRemoveIngredient: ingName =>
			dispatch(burgerBuilder.removeIngredient(ingName)),
		onInitiateIngredient: () => dispatch(burgerBuilder.initializeIngredient()),
	};
};

// WithErrorHandler - is used to handle errors globaly
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(WithErrorHandler(BurgerBuilder, axios));
