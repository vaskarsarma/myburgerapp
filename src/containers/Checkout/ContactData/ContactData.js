import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

import Input from '../../../components/UI/Input/Input';

import { connect } from 'react-redux';

import WithErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';

import * as orderAction from '../../../store/actions/index';

import { updatedObject, checkInputValidity } from '../../../shared/utility';

class ContactData extends Component {
	state = {
		orderFrom: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					name: 'name',
					placeholder: 'Your Name',
				},
				validation: {
					required: true,
				},
				valid: false,
				value: '',
				touched: false,
			},
			steet: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					name: 'street',
					placeholder: 'Street',
				},
				validation: {
					required: true,
				},
				valid: false,
				value: '',
				touched: false,
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					name: 'zipcode',
					placeholder: 'Zip Code',
				},
				validation: {
					required: true,
					minlength: 3,
					maxlength: 8,
				},
				valid: false,
				value: '',
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					name: 'country',
					placeholder: 'Country',
				},
				validation: {
					required: true,
				},
				valid: false,
				value: '',
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					name: 'email',
					placeholder: 'Your e-Mail',
				},
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				value: '',
				touched: false,
			},
			deliveryoptions: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayvalue: 'Fastest' },
						{ value: 'cheapest', displayvalue: 'Cheapest' },
					],
				},
				validation: {},
				valid: true,
				value: 'fastest',
			},
		},
		isFormValid: false,
		//loading: false,
	};

	orderHandler = event => {
		event.preventDefault();
		//this.setState({ loading: true });
		const customerData = {};

		for (let element in this.state.orderFrom) {
			customerData[element] = this.state.orderFrom[element].value;
		}

		console.log(customerData);
		const orderData = {
			ingredient: this.props.ingredient,
			price: '$' + this.props.price.toFixed(2),
			customer: customerData,
			userId: this.props.userId,
		};

		//console.log(this.props.error, this.props.loading);

		this.props.onSubmitOrder(orderData, this.props.history, this.props.token);
		//this.props.history.push('/');
		//console.log(this.props.error, this.props.loading);
		//if (!this.props.error) this.props.history.push('/');

		// axios
		// 	.post('/order.json', data)
		// 	.then(response => {
		// 		this.setState({ loading: false });
		// 		this.props.history.push('/');
		// 	})
		// 	.catch(error => {
		// 		this.setState({ loading: false });
		// 		console.log(error);
		// 	});
	};

	inputchangehandler = (event, inputfieldname) => {
		const updatedInputElement = updatedObject(
			this.state.orderFrom[inputfieldname],
			{
				value: event.target.value.trim(),
				valid: checkInputValidity(
					event.target.value.trim(),
					this.state.orderFrom[inputfieldname].validation,
				),
				touched: true,
			},
		);
		//{ ...updatedOrderForm[inputfieldname] };

		//updatedInputElement.value = event.target.value.trim();
		// updatedInputElement.valid = this.checkInputValidity(
		// 	updatedInputElement.value,
		// 	updatedInputElement.validation,
		// );

		//updatedInputElement.touched = true;
		const updatedOrderForm = updatedObject(this.state.orderFrom, {
			[inputfieldname]: updatedInputElement,
		});
		//{ ...this.state.orderFrom };
		//updatedOrderForm[inputfieldname] = updatedInputElement;

		let isformvalid = true;
		for (let k in updatedOrderForm) {
			isformvalid = updatedOrderForm[k].valid && isformvalid;
		}

		this.setState({ orderFrom: updatedOrderForm, isFormValid: isformvalid });
	};

	render() {
		let formElement = [];
		for (let key in this.state.orderFrom) {
			formElement.push({
				id: key,
				config: this.state.orderFrom[key],
			});
		}

		let formElements = formElement.map(element => {
			return (
				<Input
					key={element.id}
					elementtype={element.config.elementType}
					elementconfig={element.config.elementConfig}
					invalid={!element.config.valid}
					shouldValidate={element.config.validation}
					istouched={element.config.touched}
					changed={event => this.inputchangehandler(event, element.id)}
				/>
			);
		});

		let frmData = (
			<form onSubmit={this.orderHandler}>
				{formElements}
				<Button btnType='Success' disabled={!this.state.isFormValid}>
					ORDER
				</Button>
			</form>
		);

		if (this.props.loading) {
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

const mapStateToProps = state => {
	return {
		ingredient: state.brgr.ingredient,
		price: state.brgr.totalPrice,
		loading: state.brgrorder.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmitOrder: (data, history, token) =>
			dispatch(orderAction.submitOrder(data, history, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(WithErrorHandler(ContactData, axios));
