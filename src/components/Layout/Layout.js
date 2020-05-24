import React from "react";
import AUX from "../../hoc/hoc-aux";
import classes from "./Layout.css";

const Layout = (props) => {
  return (
    <AUX>
      <div>ToolBar, SideDrawer, BackDrop</div>
      <main className={classes.Content}>{props.children}</main>
    </AUX>
  );
};

export default Layout;
