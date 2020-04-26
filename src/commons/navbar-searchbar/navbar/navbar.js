import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { safeGet } from '../../util/utility';
import { MenuItemsService } from '../../services/menu-items-service';
import { WorkspaceService } from '../../workspaces-menu/workspace-service';
import * as toastr from 'toastr';

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
    this.menuItemsService
      .getMenuItems(product)
      .then((res) => (this.menuItems = res));
  }

  detached() {
    this.subscription.dispose();
  }

  handleStarIcon() {
    let url = window.location.href;
    return this.workspaceService.getAlreadyInMenu(url);
  }

  handleFavorites() {
    const url = this.router.currentInstruction.fragment;
    const name = this.router.currentInstruction.config.title;

    if (!!url) {
      this.workspaceService
        .addWorkspace({
          title: name,
          url: url,
          userId: 'ADMIN' // TODO: should not be hard-coded
        })
        .then(() => {
          this.workspaceMenu.loadWorkspaces();
          toastr.success('Workspace successfully saved!');
        })
        .catch((error) => {
          /* eslint no-console: ["error", { allow: ["error"] }] */
          toastr.error('An error occured while saving workspace');
        });
    }
  }
}
