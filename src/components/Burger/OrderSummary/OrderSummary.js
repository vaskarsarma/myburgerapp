import React from "react";

import AUX from "../../../hoc/hoc-aux";

const orderSummary =(props) => {
    const listOfIngredients = Object.keys(props.ingredient)
    .map(ingKey => {
        return (
        <li key={ingKey}>
            <p><span style={{ textTransform: 'capitalize' }}>{ingKey}</span> : {props.ingredient[ingKey]}</p>
        </li>);
    })

    return (
        <AUX>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {listOfIngredients}
            </ul>
            <p>Continue to checkout ?</p>
        </AUX>
    )
}

export default orderSummary;