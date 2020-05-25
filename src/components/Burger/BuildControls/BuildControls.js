import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" }
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
        
            <p>Burger Price : <strong>$ {props.totalprice.toFixed(2)}</strong></p>
            {
                controls.map(ctrl => (
                    <BuildControl
                        key={ctrl.label}
                        Labels={ctrl.label}
                        Added={() => props.addIngredient(ctrl.type)}
                        Removed={() => props.removeIngredient(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                    />
                ))
            }
            <button 
                disabled={!props.puchasable}
                className={classes.OrderButton}>ORDER NOW</button>
        </div>
    )
};

export default buildControls;