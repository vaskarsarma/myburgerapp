import React from "react";
import AUX from "../../hoc/hoc-aux";
import classes from "./Layout.css";
import Toolbar from "../Naivgation/Toolbar/Toolbar";

const Layout = (props) => {
  return (
    <AUX>
      {/* <div>ToolBar, SideDrawer, BackDrop</div> */}
      <Toolbar />
      <main className={classes.Content}>{props.children}</main>
    </AUX>
  );
};

export default Layout;
