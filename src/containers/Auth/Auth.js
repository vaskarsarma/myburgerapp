import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
	state = {
		controlFrom: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					name: 'email',
					placeholder: 'Mail Address',
				},
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				value: '',
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					name: 'Password',
					placeholder: 'Password',
				},
				validation: {
					required: true,
					minlength: 6,
					maxlength: 10,
				},
				valid: false,
				value: '',
				touched: false,
			},
		},
		isFormValid: false,
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

		if (rule.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(inputValue) && isValid;
		}

		if (rule.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(inputValue) && isValid;
		}

		return isValid;
	}

	inputchangehandler = (event, inputfieldname) => {
		const updatedOrderForm = { ...this.state.controlFrom };
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

		this.setState({ controlFrom: updatedOrderForm, isFormValid: isformvalid });
	};

	render() {
		let formElement = [];
		for (let key in this.state.controlFrom) {
			formElement.push({
				id: key,
				config: this.state.controlFrom[key],
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

		return (
			<div className={classes.Auth}>
				<form>
					{formElements}
					<Button btnType='Success'>SUBMIT</Button>
				</form>
			</div>
		);
	}
}

export default Auth;
