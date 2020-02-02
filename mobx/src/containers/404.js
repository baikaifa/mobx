import React, {Component, Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import NotFoundImg from "@/assets/img/404.jpeg"

@observer
export default class Home extends Component {
  render () {
    return (
      <div className="auth-page">
          <img style={{width:"100%"}} alt='' title='' src={NotFoundImg}/>
      </div>
    );
  }
}
