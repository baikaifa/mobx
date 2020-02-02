import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';
import 'element-theme-default';
import App from './App';
import { message } from 'antd'

// 开启离线缓存
import registerServiceWorker from './registerServiceWorker';
message.config({
    top: 100,
    duration: 5,
    maxCount: 3
  });
ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
