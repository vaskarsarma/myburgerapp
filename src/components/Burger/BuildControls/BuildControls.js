import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls= [
    { label:"Meat", type:"meat" },
    { label:"Cheese", type:"cheese" },
    { label:"Salad", type:"salad" },
    { label:"Bacon", type:"bacon" }
];

const buildControls =(props) =>{
    return (
        <div className={classes.BuildControls}>
            {
                controls.map(ctrl => (
                    <BuildControl 
                    key={ctrl.label} 
                    Labels={ctrl.label} 
                    Added={() => props.addIngredient(ctrl.type)}
                    Removed={()=>props.removeIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    />
                ))
            }
        </div>
    )
};

export default buildControls;