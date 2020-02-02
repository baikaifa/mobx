//author yangguang
//date 2018-12-26
//公用 （不允许添加任何信息,修改找杨光）
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