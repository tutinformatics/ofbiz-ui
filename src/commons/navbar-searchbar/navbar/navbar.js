import { inject } from 'aurelia-dependency-injection';
import { Store } from "aurelia-store";
import { setUserLoginId } from "../../../store/store";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { safeGet } from '../../util/utility';
import { MenuItemsService } from '../../services/menu-items-service';
import "./navbar.scss"

@inject(Router, EventAggregator, MenuItemsService, Store)
export class Navbar {
  constructor(router, ea, menuItemsService,store) {
    this.store = store;
    this.store.registerAction('setUserLoginId', setUserLoginId);
    this.router = router;
    this.ea = ea;
    this.menuItemsService = menuItemsService;
    this.currentProduct = '';
  }

  created() {
    this.subscription = this.ea.subscribe('router:navigation:complete', () => {
      this.currentProduct = safeGet(() => this.router.currentInstruction.config.name, '');
      this.loadMenuItems(this.currentProduct);
    });
  }

  setCurrentProduct({ url }) {
    if (!url) {
      return;
    }
    this.router.navigate(url);
  }

  loadMenuItems(product) {
    this.menuItemsService.getMenuItems(product)
      .then(res => this.menuItems = res);
  }

  detached() {
    this.subscription.dispose();
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
