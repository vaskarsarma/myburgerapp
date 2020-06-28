import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authActions from '../../store/actions/index';
import { updatedObject, checkInputValidity } from '../../shared/utility';

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

	componentDidMount() {
		if (!this.props.isBurgerBuild && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
			// console.log('qqq');
		}
	}

	// checkInputValidity(inputValue, rule) {
	// 	let isValid = true;

	// 	if (rule.required) {
	// 		isValid = inputValue !== '' && isValid;
	// 	}

	// 	if (rule.minlength) {
	// 		isValid = inputValue.length >= rule.minlength && isValid;
	// 	}

	// 	if (rule.maxlength) {
	// 		isValid = inputValue.length <= rule.maxlength && isValid;
	// 	}

	// 	if (rule.isEmail) {
	// 		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	// 		isValid = pattern.test(inputValue) && isValid;
	// 	}

	// 	if (rule.isNumeric) {
	// 		const pattern = /^\d+$/;
	// 		isValid = pattern.test(inputValue) && isValid;
	// 	}

	// 	return isValid;
	// }

	inputchangehandler = (event, inputfieldname) => {
		const updatedInputElement = updatedObject(
			this.state.controlFrom[inputfieldname],
			{
				value: event.target.value.trim(),
				valid: checkInputValidity(
					event.target.value,
					this.state.controlFrom[inputfieldname].validation,
				),
				touched: true,
			},
		);
		const updatedOrderForm = updatedObject(this.state.controlFrom, {
			[inputfieldname]: updatedInputElement,
		});

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
		// console.log(this.state.isSignUP);
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

		//console.log(this.props.ingredient);

		// let totalIng = 0;
		// if (this.props.ingredient) {
		// 	totalIng = Object.keys(this.props.ingredient)
		// 		.map(i => {
		// 			return this.props.ingredient[i];
		// 		})
		// 		.reduce((prevSum, cVal) => prevSum + cVal, 0);
		// }

		// const authenticated = this.props.isAuthenTicated ? (
		// 	totalIng > 0 ? (
		// 		<Redirect to='/Checkout' />
		// 	) : (
		// 		<Redirect to='/' />
		// 	)
		// ) : null;

		let getRedirectPath = null;
		// console.log('sfsdd ' + this.props.authRedirectPath);
		if (this.props.isAuthenticated) {
			getRedirectPath = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={classes.Auth}>
				{getRedirectPath}
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
	// console.log('token');
	// console.log(state.auth.token);
	return {
		ingredient: state.brgr.ingredient,
		error: state.auth.error,
		loading: state.auth.loading,
		isAuthenticated: state.auth.token !== null,
		isBurgerBuild: state.brgr.buildingBurger,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuthSubmit: (email, password, isSignUP) =>
			dispatch(authActions.autheticate(email, password, isSignUP)),

		onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/')),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Auth);
