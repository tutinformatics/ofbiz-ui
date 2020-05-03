import { inject } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';
import { reset } from '../../../store/store';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { safeGet } from '../../util/utility';
import { MenuItemsService } from '../../services/menu-items-service';
import './navbar.scss';
import { WorkspaceService } from '../../workspaces-menu/workspace-service';
import * as toastr from 'toastr';
import { AppService } from '../../services/app-service';

@inject(
  Router,
  EventAggregator,
  MenuItemsService,
  WorkspaceService,
  Store,
  AppService
)
export class Navbar {
  constructor(
    router,
    ea,
    menuItemsService,
    workspaceService,
    store,
    appService
  ) {
    this.store = store;
    this.store.registerAction('reset', reset);
    this.subscription = this.store.state.subscribe(
      (state) => (this.state = state)
    );
    this.router = router;
    this.ea = ea;
    this.menuItemsService = menuItemsService;
    this.workspaceService = workspaceService;
    this.appService = appService;
    this.currentProduct = '';
    this.title = '';
    this.applications = [];
    this.workspaces = [];
  }

  created() {
    // TODO: should load apps for current user?
    this.loadApplications();
    this.loadWorkspaces();
    this.routerSubscription = this.ea.subscribe(
      'router:navigation:complete',
      () => {
        this.currentProduct = safeGet(
          () => this.router.currentInstruction.config.name,
          ''
        );
        this.loadMenuItems(this.currentProduct);
      }
    );
  }

  get isFavourite() {
    const url = this.router.currentInstruction.fragment;
    return this.workspaces.some((x) => x.url === url);
  }

  setCurrentProduct({ url, title }) {
    this.title = title;
    if (!url) {
      return;
    }
    this.router.navigate(url);
  }

  loadWorkspaces() {
    if (!this.state.userLoginId) {
      return;
    }
    this.workspaceService
      .getWorkspaceList({ userId: this.state.userLoginId })
      .then((response) => (this.workspaces = response))
      .catch((error) => toastr.error(error.message));
  }

  loadApplications() {
    this.appService.getApplications().then((res) => (this.applications = res));
  }

  loadMenuItems(product) {
    this.menuItemsService
      .getMenuItems(product)
      .then((res) => (this.menuItems = res));
  }

  handleFavorite() {
    const url = this.router.currentInstruction.fragment;
    const name = this.router.currentInstruction.config.title;

    if (!url) {
      return;
    }

    this.workspaceService
      .addWorkspace({
        title: name,
        url: url,
        userId: this.state.userLoginId
      })
      .then(() => {
        this.loadWorkspaces();
        toastr.success('Workspace successfully saved!');
      })
      .catch((error) => toastr.error(error.message));
  }

  logOut() {
    this.store.dispatch('reset');
    this.navigateTo('/');
  }

  navigateTo(path) {
    this.router.navigate(path);
  }

  detached() {
    this.routerSubscription.dispose();
    this.subscription.dispose();
  }
}
