import React, { Component } from "react";
import AUX from "../../hoc/hoc-aux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICE = {
  salad: 0.5,
  meat: 1.6,
  bacon: 0.4,
  cheese: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const ingCurrentCount = this.state.ingredient[type];
    const ingUpdatedCount = ingCurrentCount + 1;
    const newState = { ...this.state.ingredient };
    newState[type] = ingUpdatedCount;

    const oldPrice = this.state.totalPrice;
    const ingredientPrice = INGREDIENT_PRICE[type];
    const updatedPrice = oldPrice + ingredientPrice;

    this.setState({
      totalPrice: updatedPrice,
      ingredient: newState
    });
  }

  removeIngredientHandler = (type) => {
    const ingCurrentCount = this.state.ingredient[type];

    if (ingCurrentCount <= 0) return;

    const ingUpdatedCount = (ingCurrentCount >= 0) ? ingCurrentCount - 1 : 0;
    const newState = { ...this.state.ingredient };
    newState[type] = ingUpdatedCount;

    const oldPrice = this.state.totalPrice;
    const ingredientPrice = INGREDIENT_PRICE[type];
    const updatedPrice = oldPrice - ingredientPrice;

    this.setState({
      totalPrice: (updatedPrice > 4) ? updatedPrice : 4,
      ingredient: newState
    });
  }

  render() {
    const disabledInfo= {...this.state.ingredient};
    for(let key in disabledInfo){
      disabledInfo[key]= disabledInfo[key] <= 0;
    }

    return (
      <AUX>
        <Burger ingredient={this.state.ingredient} />
        <BurgerControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled= {disabledInfo}
          totalprice={this.state.totalPrice}
        />
      </AUX>
    );
  }
}

export default BurgerBuilder;
