import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1 style={{ color: 'green' }}>Hope you like it, Come again !!!</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredient={props.ingredient} />
			</div>
			<Button btnType='Danger' clicked={props.cancelorder}>
				CANCEL
			</Button>
			<Button btnType='Success' clicked={props.continuepurchasing}>
				CONTINUE
			</Button>
		</div>
	);
};

export default checkoutSummary;
