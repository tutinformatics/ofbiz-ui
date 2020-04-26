import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { safeGet } from '../../util/utility';
import { MenuItemsService } from '../../services/menu-items-service';
import { WorkspaceService } from '../../workspaces-menu/workspace-service';

@inject(Router, EventAggregator, MenuItemsService, WorkspaceService)
export class Navbar {
  constructor(router, ea, menuItemsService, workspaceService) {
    this.router = router;
    this.ea = ea;
    this.menuItemsService = menuItemsService;
    this.currentProduct = '';
    this.workspaceService = workspaceService;
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


  handleStarIcon() {
    var url = window.location.href;
    return this.workspaceService.getAlreadyInMenu(url);
  }

  handleFavorites() {
    var url = window.location.href;
    var name = url.split('/')[url.split('/').length - 1];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    this.workspaceService.addWorkspace(name, url);
  }
}
