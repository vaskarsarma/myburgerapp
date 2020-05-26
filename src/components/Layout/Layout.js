import React, { Component } from "react";
import AUX from "../../hoc/hoc-aux";
import classes from "./Layout.css";
import Toolbar from "../Naivgation/Toolbar/Toolbar";
import SideDrawer from "../Naivgation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  closeSidedrawerHandler =() =>{
    this.setState({showSideDrawer:false})
  }

  showSidedrawerHandler =() => {
    this.setState((prevState) => {
      return {showSideDrawer : !prevState.showSideDrawer};
    }); 
  }

  render() {
    return (
      <AUX>
        <Toolbar closed={this.showSidedrawerHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.closeSidedrawerHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </AUX>
    );
  }
}

export default Layout;
