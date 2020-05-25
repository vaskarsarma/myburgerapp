import React from "react";
import AUX from "../../../hoc/hoc-aux";
import Button from "../../UI/Button/Button";

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
            <p><strong>Total Price : ${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout ?</p>
            <Button btnType="Danger" clicked={props.cancelOrder} >CANCEL</Button>
            <Button btnType="Success" clicked={props.continuePurchase} >CONTINUE</Button>
        </AUX>
    )
}

export default orderSummary;