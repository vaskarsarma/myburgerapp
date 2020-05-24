import React, { Component } from "react";
import AUX from "../../hoc/hoc-aux";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  render() {
    return (
      <AUX>
        <Burger/>
        <div>BurgerBuilder</div>
      </AUX>
    );
  }
}

export default BurgerBuilder;
