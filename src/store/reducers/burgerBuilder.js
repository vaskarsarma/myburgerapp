import * as actionTypes from '../actions/actionTypes';

const initialeState = {
	ingredient: null,
	basePrice: 4,
	totalPrice: 4,
	error: false,
	//puchasable: false,
	//loading: false,
};

const INGREDIENT_PRICE = {
	salad: 0.5,
	bacon: 0.4,
	meat: 1.6,
	cheese: 0.7,
};

const getUpdatedPrice = (ingredients, basePrice) => {
	const tPrice = Object.keys(ingredients)
		.map(ingKey => {
			// console.log(
			// 	ingKey + ' : ' + INGREDIENT_PRICE[ingKey] + ' : ' + ingredients[ingKey],
			// );
			return INGREDIENT_PRICE[ingKey] * ingredients[ingKey];
		})
		.reduce((tprice, el) => tprice + el, basePrice);
	//console.log(tPrice);
	//this.setState({ totalPrice: tPrice });
	return tPrice;
};

const reducer = (state = initialeState, action) => {
	switch (action.type) {
		case actionTypes.addIngredient:
			return {
				...state,
				ingredient: {
					...state.ingredient,
					[action.ingredientName]: state.ingredient[action.ingredientName] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
				//puchasable: true,
			};
		case actionTypes.removeIngredient:
			return {
				...state,
				ingredient: {
					...state.ingredient,
					[action.ingredientName]: state.ingredient[action.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
				//puchasable: true,
			};
		case actionTypes.initializeIngredient:
			return {
				...state,
				//ingredient: action.ingredient,
				ingredient: {
					meat: action.ingredient.meat,
					cheese: action.ingredient.cheese,
					salad: action.ingredient.salad,
					bacon: action.ingredient.bacon,
				},
				error: false,
				totalPrice: getUpdatedPrice(action.ingredient, state.basePrice),
			};
		case actionTypes.fetchIngredientFailed:
			return {
				...state,
				error: true,
			};
		// case actionTypes.submitOrderSuccess:
		// 	return {
		// 		...state,
		// 		loading: action.loading,
		// 		error: false,
		// 	};
		// case actionTypes.submitOrderError:
		// 	return {
		// 		...state,
		// 		loading: action.loading,
		// 		error: true,
		// 	};
		default:
			return state;
	}
};

export default reducer;
