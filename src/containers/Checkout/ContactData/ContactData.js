import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
	};

	orderHandler = () => {};

	render() {
		return (
			<div className={classes.ContactData}>
				<h1>Enter your contact data</h1>
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
			</div>
		);
	}
}

export default ContactData;
