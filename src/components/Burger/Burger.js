import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let transfromIngredient = Object.keys(props.ingredient).map(ingKey => {
    return [...Array(props.ingredient[ingKey])].map((_, i) => {
      return (
        <BurgerIngredient key={ingKey + i} type={ingKey}></BurgerIngredient>
      );
    });
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, []);

  if (transfromIngredient.length === 0)
    transfromIngredient = <p>Please add required ingredients.</p>

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transfromIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
