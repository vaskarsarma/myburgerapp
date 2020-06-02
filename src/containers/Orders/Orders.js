import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

class Orders extends Component {
	state = {
		orders: [],
		loading: false,
	};

	componentDidMount() {
		this.setState({ loading: true });
		Axios.get('/order.json')
			.then(response => {
				console.log(response.data);
				const fetchedOrder = [];
				for (let key in response.data) {
					fetchedOrder.push({
						...response.data[key],
						id: key,
					});
				}
				this.setState({
					loading: false,
					orders: fetchedOrder,
				});
			})
			.catch(err => {
				console.log(err);
				this.setState({
					loading: false,
				});
			});
	}

	render() {
		let orderList = this.state.orders.map(order => {
			return (
				<Order
					key={order.id}
					price={order.price}
					ingredients={order.ingredient}
				/>
			);
		});

		if (this.state.orders.length === 0) {
			orderList = <Spinner />;
		}

		return <div>{orderList}</div>;
	}
}

export default withErrorHandler(Orders, Axios);
