import { inject } from 'aurelia-dependency-injection';
import { Store } from "aurelia-store";
import { reset } from "../../../store/store";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { safeGet } from '../../util/utility';
import { MenuItemsService } from '../../services/menu-items-service';
import "./navbar.scss"

@inject(Router, EventAggregator, MenuItemsService, Store)
export class Navbar {

  constructor(router, ea, menuItemsService,store) {
    this.store = store;
    this.store.registerAction('reset', reset);
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
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

  logOut() {
    this.store.dispatch('reset');
    this.navigateTo('/');
  }

  navigateTo(path) {
    this.router.navigate(path)
  }

}
