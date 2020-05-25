import React from "react";
import burgerLogo from "../../assests/Images/burger-logo.png";
import classes from "./Logo.css";

const logo= (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="My Burger Logo"></img>
    </div>
)

export default logo;