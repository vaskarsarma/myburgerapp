import React, { Component } from "react";
import AUX from "../Hoc/hoc-aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Naivgation/Toolbar/Toolbar";
import SideDrawer from "../../components/Naivgation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
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
