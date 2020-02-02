import { observable, action, runInAction } from "mobx";
class TestStore {
  @observable Count = 0;

  @action changeCount = () => {
    this.Count += 1;
  };
}
export default new TestStore();
