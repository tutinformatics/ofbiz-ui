import { inject } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';
import { reset } from '../../../store/store';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { safeGet } from '../../util/utility';
import './navbar.scss';
import { WorkspaceService } from '../../workspaces-menu/workspace-service';
import * as toastr from 'toastr';
import { AppService } from '../../services/app-service';
import { NavigationService } from '../../services/navigation-service';
import { faTh } from '@fortawesome/free-solid-svg-icons';

@inject(
  Router,
  EventAggregator,
  WorkspaceService,
  Store,
  AppService,
  NavigationService
)
export class Navbar {
  constructor(
    router,
    ea,
    workspaceService,
    store,
    appService,
    navigationService
  ) {
    this.store = store;
    this.store.registerAction('reset', reset);
    this.subscription = this.store.state.subscribe(
      (state) => (this.state = state)
    );
    this.router = router;
    this.ea = ea;
    this.workspaceService = workspaceService;
    this.appService = appService;
    this.navigationService = navigationService;
    this.currentProduct = '';
    this.applications = [];
    this.workspaces = [];
    this.gridIcon = faTh;
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
        this.title =  safeGet(
          () => this.router.currentInstruction.config.title,
          'Select'
        );
        this.loadMenuItems(this.currentProduct);
      }
    );
  }

  get isFavourite() {
    const url = this.router.currentInstruction.fragment;
    return this.workspaces.some((x) => x.url === url);
  }

  setCurrentProduct({ url }) {
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
    this.navigationService.getRoutes(this.currentProduct).then((response) => {
      this.menuItems = response;
    });
  }

  handleFavorite() {
    const url = this.router.currentInstruction.fragment;
    const title = document.title.split('|')[0]; // router cannot access titles of child routes

    if (!url || this.isFavourite) {
      return;
    }

    this.workspaceService
      .addWorkspace({
        title: title,
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

  navigateToChildRoute(path) {
    // TODO: kind of hack, maybe some kind of resolver needs to be added for child routes
    // https://discourse.aurelia.io/t/aurelia-child-route-navigation/2201/6
    this.router.navigate(`${this.currentProduct}/${path}`);
  }

  detached() {
    this.routerSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
}
