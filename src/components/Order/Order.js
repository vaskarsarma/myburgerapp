import React from 'react';

import classes from './Order.css';

const order = props => {
	console.log(props.ingredients);

	const ingredients = [];

	for (let i in props.ingredients) {
		ingredients.push({
			name: i,
			quantity: props.ingredients[i],
		});
	}

	console.log(ingredients);

	const listIngredient = ingredients.map(ig => {
		return (
			<span className={classes.Ingdisplay} key={ig.name}>
				{ig.name} ({ig.quantity})
			</span>
		);
	});

	return (
		<div className={classes.Order}>
			<p>Ingredient : {listIngredient}</p>
			<p>
				Price : <strong>{props.price}</strong>
			</p>
		</div>
	);
};

export default order;
