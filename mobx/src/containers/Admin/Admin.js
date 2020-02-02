import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";

import { inject, observer } from "mobx-react";
import { Button, message, Checkbox } from "antd";

//inject与observer必须紧跟class，否则会出现当props改变的时候页面不重新渲染的问题
@withRouter
@inject("TestStore")
@observer
export class Admin extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button onClick={ () => {this.props.TestStore.changeCount()} }>改变Count</Button>
        <div>现在Count是{this.props.TestStore.Count}</div>
      </React.Fragment>
    );
  }
}
