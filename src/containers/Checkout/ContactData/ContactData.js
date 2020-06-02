import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	};

	orderHandler = event => {
		event.preventDefault();
		console.log(this.props.ingredient);
		this.setState({ loading: true });
		const data = {
			ingredient: this.props.ingredient,
			price: '$' + this.props.price.toFixed(2),
			customer: {
				name: 'Vaskar Sarma',
				address: {
					buildingnumber: '222',
					flatno: '22233',
					area: 'Dubai',
					city: 'Dubai',
				},
				email: 'test@gmail.com',
				contactno: '4344234344343',
			},
			deliveryoptions: 'fastest',
		};
		axios
			.post('/order.json', data)
			.then(response => {
				this.setState({ loading: false });
				console.log(response);
				this.props.history.push('/orders');
			})
			.catch(error => {
				this.setState({ loading: false });
				console.log(error);
			});
	};

	render() {
		let frmData = (
			<form>
				<input
					type='text'
					className={classes.Input}
					name='name'
					placeholder='Your Name'
				></input>
				<input
					type='email'
					className={classes.Input}
					name='email'
					placeholder='Your Mail ID'
				></input>
				<input
					type='text'
					className={classes.Input}
					name='street'
					placeholder='Street'
				></input>
				<input
					type='text'
					className={classes.Input}
					name='postalCode'
					placeholder='Postal Code'
				></input>
				<Button btnType='Success' clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			frmData = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h1>Enter your contact data</h1>
				{frmData}
			</div>
		);
	}
}

export default ContactData;
