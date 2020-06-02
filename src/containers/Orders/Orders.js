import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import AUX from '../../hoc/Hoc/hoc-aux';

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
		let orderList = (
			<AUX>
				<Order />
				<Order />
				<Order />
			</AUX>
		);

		if (this.state.orders.length === 0) {
			orderList = <Spinner />;
		}

		return <div>{orderList}</div>;
	}
}

export default withErrorHandler(Orders, Axios);
