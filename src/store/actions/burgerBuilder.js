import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingName => {
	return { type: actionTypes.addIngredient, ingredientName: ingName };
};

export const removeIngredient = ingName => {
	return { type: actionTypes.removeIngredient, ingredientName: ingName };
};

export const setIngredient = ingredient => {
	return {
		type: actionTypes.initializeIngredient,
		ingredient: ingredient,
	};
};

export const fetchIngredientFailed = () => {
	return {
		type: actionTypes.fetchIngredientFailed,
	};
};

export const initializeIngredient = () => {
	return dispatch => {
		return axios
			.get(`/ingredient.json`)
			.then(response => {
				// this.setState({ ingredient: response.data });
				// this.updatePurchaseHandler(this.state.ingredient);
				// this.getUpdatedPrice(this.state.ingredient);
				dispatch(setIngredient(response.data));
			})
			.catch(error => {
				//console.log(error);
				// this.setState({ error: true });
				dispatch(fetchIngredientFailed());
			});
	};
};
