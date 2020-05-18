import { inject } from 'aurelia-dependency-injection';
import { NavigationService } from '../commons/services/navigation-service';

@inject(NavigationService)
export class Sfa {

  constructor(navigationService) {
    this.navigationService = navigationService;
    this.navigationService
      .getRoutes('sfa')
      .then((response) => (this.routes = response));
  }

  configureRouter(config, router) {
    config.options.pushState = true;
    config.options.root = '/';
    config.map(this.routes);
    this.router = router;
    this.router.refreshNavigation();
  }
}
