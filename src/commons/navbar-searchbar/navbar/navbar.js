import { inject } from 'aurelia-dependency-injection';
import { Store } from "aurelia-store";
import { setUserLoginId } from "../../../store/store";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { safeGet } from '../../util/utility';
import { MenuItemsService } from '../../services/menu-items-service';
import "./navbar.scss"
import {WorkspaceService} from "../../workspaces-menu/workspace-service";

@inject(Router, EventAggregator, MenuItemsService, WorkspaceService, Store)
export class Navbar {
  constructor(router, ea, menuItemsService,store) {
    this.store = store;
    this.store.registerAction('setUserLoginId', setUserLoginId);
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
    this.router = router;
    this.ea = ea;
    this.menuItemsService = menuItemsService;
    this.currentProduct = '';
    this.workspaceService = workspaceService;
  }

  created() {
    this.routerSubscription = this.ea.subscribe('router:navigation:complete', () => {
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
    this.routerSubscription.dispose();
    this.subscription.dispose();
  }

  logOut() {
    localStorage.removeItem('userLoginId');
    localStorage.removeItem('token');
    this.store.dispatch('setUserLoginId', null);
    this.navigateTo('#/login');
  }

  navigateTo(path) {
    this.router.navigate(path)
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
