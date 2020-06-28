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

export const submitOrder = (orderData, history, token) => {
	return dispatch => {
		dispatch(waitOrderSubmission());
		axios
			.post('/order.json?auth=' + token, orderData)
			.then(response => {
				// console.log(response.data);
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

export const fetchOrderSuccess = fetchedOrder => {
	return {
		type: actionTypes.fetchOrderSuccess,
		fetchedorders: fetchedOrder,
	};
};

export const fetchOrderFail = error => {
	return {
		type: actionTypes.fetchOrderFail,
		error: error,
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.fetchOrderStart,
	};
};

export const fetchOrder = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrderStart);
		const qParam =
			'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get('/order.json' + qParam)
			.then(response => {
				//console.log(response.data);
				const fetchedOrder = [];
				for (let key in response.data) {
					fetchedOrder.push({
						...response.data[key],
						id: key,
					});
				}
				dispatch(fetchOrderSuccess(fetchedOrder));

				// this.setState({
				// 	loading: false,
				// 	orders: fetchedOrder,
				// });
			})
			.catch(err => {
				//console.log(err);
				// this.setState({
				// 	loading: false,
				// });
				dispatch(fetchOrderFail(err));
			});
	};
};
