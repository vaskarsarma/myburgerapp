import * as actionTypes from './actions';

const initialeState = {
	ingredient: {
		salad: 0,
		bacon: 0,
		meat: 0,
		cheese: 0,
	},
	totalPrice: 4,
	//puchasable: false,
};

const INGREDIENT_PRICE = {
	salad: 0.5,
	bacon: 0.4,
	meat: 1.6,
	cheese: 0.7,
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
		default:
			return state;
	}
};

export default reducer;
