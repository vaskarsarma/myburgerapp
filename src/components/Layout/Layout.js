import React from "react";
import AUX from "../../hoc/hoc-aux";

const Layout = (props) => {
  return (
    <AUX>
      <div>ToolBar, SideDrawer, BackDrop</div>
      <main>{props.children}</main>
    </AUX>
  );
};

export default Layout;
