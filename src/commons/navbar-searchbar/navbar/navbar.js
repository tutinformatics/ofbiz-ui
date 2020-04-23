import { Store } from "aurelia-store";
import { setUserLoginId } from "../../../store/store";
import { inject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import "./navbar.scss"

@inject(Router, Store)
export class Navbar {

  constructor(router, store) {
    this.store = store;
    this.router = router;
    this.store.registerAction('setUserLoginId', setUserLoginId);
  }

  bind() {
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
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
