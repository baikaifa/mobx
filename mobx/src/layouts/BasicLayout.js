import React, { Component, Fragment } from "react";

import { Admin } from "../containers/Admin/Admin";
import { inject, observer } from "mobx-react";

@inject("TestStore")
@observer
export default class BasicLayout extends React.Component {
  state = { version: 0, can_render: false };
  render() {
    return <Admin />;
  }
}
