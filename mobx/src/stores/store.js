
import {configure} from 'mobx';
import store from "./index";
//引用store组件

configure ({
  enforceActions: 'always', // 严格模式
});

const stores = {
  ...store
};

export default stores;