import React, { Component } from "react";
import AUX from "../../hoc/hoc-aux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  state={
    ingredient:{
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese:0
    }
  }  

  render() {
    return (
      <AUX>
        <Burger ingredient={this.state.ingredient}/>
        <BurgerControls />
      </AUX>
    );
  }
}

export default BurgerBuilder;
