import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
	orders: [],
	loading: false,
};

const submitOrderSucess = (state, action) => {
	const newOrder = updatedObject(action.orderData, { id: action.orderid });
	return updatedObject(state, {
		orders: state.orders.concat(newOrder),
		loading: false,
	});
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.submitOrderSuccess:
			return submitOrderSucess(state, action);
		case actionTypes.fetchOrderFail:
		case actionTypes.submitOrderError:
			return updatedObject(state, { loading: false });
		case actionTypes.waitOrderSubmission:
			return updatedObject(state, { loading: true });
		case actionTypes.fetchOrderSuccess:
			return updatedObject(state, {
				orders: action.fetchedorders,
				loading: false,
			});
		case actionTypes.fetchOrderStart: {
			return updatedObject(state, { loading: true });
		}
		default:
			return state;
	}
};

export default orderReducer;
