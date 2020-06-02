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
				<h1>Contact Data</h1>
				<input type='text' name='name' placeholder='Your Name'></input>
				<input type='email' name='email' placeholder='Your Mail ID'></input>
				<input type='text' name='street' placeholder='Street'></input>
				<input type='text' name='postalCode' placeholder='Postal Code'></input>
				<Button btnType='SUCCESS' clicked={this.orderHandler}>
					ORDER
				</Button>
			</div>
		);
	}
}

export default ContactData;
