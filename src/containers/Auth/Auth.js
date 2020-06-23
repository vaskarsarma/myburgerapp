import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authActions from '../../store/actions/index';

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
		isSignUP: true,
		isContentUpdated: false,
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

		this.setState({
			controlFrom: updatedOrderForm,
			isFormValid: isformvalid,
			isContentUpdated: true,
		});
	};

	onSubmitHandler = event => {
		console.log(this.state.isSignUP);
		event.preventDefault();
		this.setState({ isContentUpdated: false });
		this.props.onAuthSubmit(
			this.state.controlFrom['email'].value,
			this.state.controlFrom['password'].value,
			this.state.isSignUP,
		);
	};

	onSwitchToSignUPHandler = () => {
		this.setState(prevstate => {
			return { isSignUP: !prevstate.isSignUP };
		});
	};

	render() {
		let formElement = [];
		for (let key in this.state.controlFrom) {
			formElement.push({
				id: key,
				config: this.state.controlFrom[key],
			});
		}

		let errormessages = null;
		if (this.props.error && !this.state.isContentUpdated) {
			errormessages = (
				<p className={classes.ErrorMsg}>{this.props.error.message}</p>
			);
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

		if (this.props.loading) formElements = <Spinner />;

		return (
			<div className={classes.Auth}>
				{errormessages}
				<form onSubmit={this.onSubmitHandler}>
					{formElements}
					<Button btnType='Success'>Submit</Button>
				</form>
				<Button btnType='Danger' clicked={this.onSwitchToSignUPHandler}>
					Switch to {this.state.isSignUP ? 'Sign IN' : ' Sign UP'}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.auth.error,
		loading: state.auth.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuthSubmit: (email, password, isSignUP) =>
			dispatch(authActions.autheticate(email, password, isSignUP)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Auth);
