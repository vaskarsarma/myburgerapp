import React from 'react';

import classes from './Order.css';

const order = props => (
	<div className={classes.Order}>
		<p>Ingredient : Salad (1)</p>
		<p>
			Price : <strong>$ 10</strong>
		</p>
	</div>
);

export default order;
