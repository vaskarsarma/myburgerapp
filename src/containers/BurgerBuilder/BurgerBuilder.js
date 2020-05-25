import React, { Component } from "react";
import AUX from "../../hoc/hoc-aux";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state={
    ingredient:{
      salad: 2,
      meat: 1,
      bacon: 2,
      cheese:2
    }
  }  

  render() {
    return (
      <AUX>
        <Burger ingredient={this.state.ingredient}/>
        <div>BurgerBuilder</div>
      </AUX>
    );
  }
}

export default BurgerBuilder;
