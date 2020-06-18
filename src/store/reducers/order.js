import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false,
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.submitOrderSuccess:
			const newOrder = {
				...action.orderData,
				id: action.orderid,
			};
			return {
				...state,
				orders: state.orders.concat(newOrder),
				loading: false,
			};
		case actionTypes.fetchOrderFail:
		case actionTypes.submitOrderError:
			return {
				...state,
				loading: false,
			};
		case actionTypes.waitOrderSubmission:
			return {
				...state,
				loading: true,
			};
		case actionTypes.fetchOrderSuccess:
			return {
				...state,
				orders: action.fetchedorders,
				loading: false,
			};
		case actionTypes.fetchOrderStart: {
			return {
				...state,
				loading: true,
			};
		}
		default:
			return state;
	}
};

export default orderReducer;
