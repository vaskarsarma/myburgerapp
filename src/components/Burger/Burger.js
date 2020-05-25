import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  const transfromIngredient = Object.keys(props.ingredient).map(ingKey => {
    return [...Array(props.ingredient[ingKey])].map((_, i) => {
      return (
        <BurgerIngredient key={ingKey + i} type={ingKey}></BurgerIngredient>
      );
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transfromIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
