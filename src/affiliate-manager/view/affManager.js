import { connectTo } from "aurelia-store";
import { pluck } from "rxjs/operators";

@connectTo({
  target: 'currentState',
  selector: {
    userLoginId: (store) => store.state.pipe(pluck('userLoginId')),
  }
})
export class AffManager {

  constructor() {
    this.view = null;
  }

  activate(params) {
    this.view = params.view;
  }

  isGuest() {
    return this.view === 'guest';
  }

  isMember() {
    return this.view === 'member'
      || (this.currentState.userLoginId && this.currentState.userLoginId['userLoginId'] === 'member');
  }

  isAdmin() {
    return this.view === 'admin'
      || (this.currentState.userLoginId && this.currentState.userLoginId['userLoginId'] === 'admin');
  }

  isPendingMember() {
    return this.view === 'pending'
  }

}
