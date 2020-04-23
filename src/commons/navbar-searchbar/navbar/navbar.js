import { connectTo, Store } from "aurelia-store";
import { pluck } from "rxjs/operators";
import { setUserLoginId } from "../../../store/state";
import { inject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";

@connectTo({
  target: 'currentState',
  selector: {
    userLoginId: (store) => store.state.pipe(pluck('userLoginId')),
  }
})
@inject(Router, Store)
export class Navbar {

  constructor(router, store) {
    this.store = store;
    this.router = router;
    this.store.registerAction('setUserLoginId', setUserLoginId);
  }

  logOut() {
    // null will be converted to 'null'
    // -> therefore, we need to compare as === 'null', not as == null
    localStorage.setItem('userLoginId', 'null');
    localStorage.setItem('token', 'null');
    this.store.dispatch('setUserLoginId', 'null');
    this.navigateTo('#/logIn');
  }

  navigateTo(path) {
    this.router.navigate(path)
  }

}
