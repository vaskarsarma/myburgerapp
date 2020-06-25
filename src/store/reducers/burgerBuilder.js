import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialeState = {
	ingredient: null,
	basePrice: 4,
	totalPrice: 4,
	error: false,
	buildingBurger: false,
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

const addIngredient = (state, action) => {
	return updatedObject(state, {
		ingredient: {
			...state.ingredient,
			[action.ingredientName]: state.ingredient[action.ingredientName] + 1,
		},
		totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
		//puchasable: true,
		buildingBurger: true,
	});
};

const removeIngredient = (state, action) => {
	return updatedObject(state, {
		ingredient: {
			...state.ingredient,
			[action.ingredientName]: state.ingredient[action.ingredientName] - 1,
		},
		totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
		buildingBurger: true,
		//puchasable: true,
	});
};

const initIngredient = (state, action) => {
	return updatedObject(state, {
		ingredient: {
			meat: action.ingredient.meat,
			cheese: action.ingredient.cheese,
			salad: action.ingredient.salad,
			bacon: action.ingredient.bacon,
		},
		error: false,
		totalPrice: getUpdatedPrice(action.ingredient, state.basePrice),
		buildingBurger: false,
	});
};

const reducer = (state = initialeState, action) => {
	switch (action.type) {
		case actionTypes.addIngredient:
			return addIngredient(state, action);
		case actionTypes.removeIngredient:
			return removeIngredient(state, action);
		case actionTypes.initializeIngredient:
			return initIngredient(state, action);
		case actionTypes.fetchIngredientFailed:
			return updatedObject(state, { error: true });
		default:
			return state;
	}
};

export default reducer;
