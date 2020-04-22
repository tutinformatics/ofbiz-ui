import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { safeGet } from '../../util/utility';
import { MenuItemsService } from '../../services/menu-items-service';

@inject(Router, EventAggregator, MenuItemsService)
export class Navbar {
  constructor(router, ea, menuItemsService) {
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
}
