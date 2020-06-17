import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const submitOrderSuccess = (id, orderData) => {
	return {
		type: actionTypes.submitOrderSuccess,
		orderid: id,
		orderData: orderData,
	};
};

export const submitOrderFailed = error => {
	return {
		type: actionTypes.submitOrderError,
		error: error,
	};
};

export const waitOrderSubmission = () => {
	return {
		type: actionTypes.waitOrderSubmission,
	};
};

export const submitOrder = (orderData, history) => {
	return dispatch => {
		dispatch(waitOrderSubmission());
		axios
			.post('/order.json', orderData)
			.then(response => {
				console.log(response.data);
				//this.setState({ loading: false });
				//this.props.history.push('/');
				dispatch(submitOrderSuccess(response.data.name, orderData));
				history.push('/');
			})
			.catch(error => {
				//this.setState({ loading: false });
				//console.log(error);
				dispatch(submitOrderFailed(error));
			});
	};
};
