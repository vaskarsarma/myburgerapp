import React, { Component } from "react";
import AUX from "../../hoc/Hoc/hoc-aux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";

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
    totalPrice: 4,
    puchasable: false,
    puchasing: false,
    loading: false
  }

  updatePurchaseHandler = (ingredients) => {
    const sum = Object.keys(ingredients).map(ingKey => {
      return ingredients[ingKey]
    }).reduce(((sum, el) => sum + el), 0);

    this.setState({ puchasable: sum > 0 });
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

    this.updatePurchaseHandler(newState);
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

    this.updatePurchaseHandler(newState);
  }

  purchasingHandler = () => {
    this.setState({ puchasing: true });
  }

  cancelPurchaseHandler = () => {
    this.setState({ puchasing: false });
  }

  continuePurchaseHandler = () => {
    this.setState({ loading: true });
    const data = {
      ingredient: this.state.ingredient,
      price: "$" + this.state.totalPrice.toFixed(2),
      customer: {
        name: 'Vaskar Sarma',
        address: {
          buildingnumber: "222",
          flatno: "22233",
          area: "Dubai",
          city: "Dubai"
        },
        email: "test@gmail.com",
        contactno: "4344234344343"
      },
      deliveryoptions: "fastest"
    }

    axios.post('/order.json', data)
      .then(response => {
        this.setState({ loading: false, puchasing: false });
        console.log(response);
      }).catch(error => {
        this.setState({ loading: false, puchasing: false });
        console.log(error);
      });
  }

  render() {
    const disabledInfo = { ...this.state.ingredient };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <OrderSummary
      totalPrice={this.state.totalPrice}
      cancelOrder={this.cancelPurchaseHandler}
      continuePurchase={this.continuePurchaseHandler}
      ingredient={this.state.ingredient}>
    </OrderSummary>;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    console.log("Burger Builder : show " + this.state.puchasing);

    return (
      <AUX>
        <Modal
          show={this.state.puchasing}
          cancelPurchase={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredient={this.state.ingredient} />
        <BurgerControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalprice={this.state.totalPrice}
          puchasable={this.state.puchasable}
          ordered={this.purchasingHandler}
        />
      </AUX>
    );
  }
}

// WithErrorHandler - is used to handle errors globaly
export default WithErrorHandler(BurgerBuilder, axios);