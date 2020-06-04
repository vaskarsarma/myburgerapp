import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

import Input from '../../../components/UI/Input/Input';

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
					minlength: 5,
					maxlength: 5,
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
		loading: false,
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const customerData = {};

		for (let element in this.state.orderFrom) {
			customerData[element] = this.state.orderFrom[element].value;
		}

		console.log(customerData);
		const data = {
			ingredient: this.props.ingredient,
			price: '$' + this.props.price.toFixed(2),
			customer: customerData,
		};
		axios
			.post('/order.json', data)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ loading: false });
				console.log(error);
			});
	};

	checkInputValidity(inputValue, rule) {
		let isValid = true;

		if (rule.required) {
			isValid = inputValue !== '' && isValid;
		}

		if (rule.minlength) {
			isValid = inputValue.length >= rule.minlength && isValid;
		}

		if (rule.maxlength) {
			isValid = inputValue.length <= rule.maxlength && isValid;
		}

		return isValid;
	}

	inputchangehandler = (event, inputfieldname) => {
		const updatedOrderForm = { ...this.state.orderFrom };
		const updatedInputElement = { ...updatedOrderForm[inputfieldname] };

		updatedInputElement.value = event.target.value.trim();
		updatedInputElement.valid = this.checkInputValidity(
			updatedInputElement.value,
			updatedInputElement.validation,
		);

		updatedInputElement.touched = true;
		updatedOrderForm[inputfieldname] = updatedInputElement;

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
