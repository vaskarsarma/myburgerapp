import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

import * as orderActions from '../../store/actions/';

class Orders extends Component {
	state = {
		orders: [],
		loading: false,
	};

	componentDidMount() {
		this.props.onFetchOrders(this.props.token);
		// this.setState({ loading: true });
		// Axios.get('/order.json')
		// 	.then(response => {
		// 		console.log(response.data);
		// 		const fetchedOrder = [];
		// 		for (let key in response.data) {
		// 			fetchedOrder.push({
		// 				...response.data[key],
		// 				id: key,
		// 			});
		// 		}
		// 		this.setState({
		// 			loading: false,
		// 			orders: fetchedOrder,
		// 		});
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 		this.setState({
		// 			loading: false,
		// 		});
		// 	});
	}

	render() {
		let orderList = <Spinner />;

		if (!this.props.loading) {
			orderList = this.props.orders.map(order => {
				return (
					<Order
						key={order.id}
						price={order.price}
						ingredients={order.ingredient}
					/>
				);
			});
		}

		// if (this.props.orders.length === 0) {
		// 	orderList = <Spinner />;
		// }

		return <div>{orderList}</div>;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.brgrorder.orders,
		loading: state.brgrorder.loading,
		token: state.auth.token,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: token => dispatch(orderActions.fetchOrder(token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(Orders, Axios));
