import { inject } from 'aurelia-dependency-injection';
import { NavigationService } from '../commons/services/navigation-service';

@inject(NavigationService)
export class ObjectDistMain {
  constructor(navigationService) {
    this.navigationService = navigationService;
    this.navigationService
      .getRoutes('object-distribution')
      .then((response) => {
        this.routes = response;
        console.log(this.routes)
      });
  }

  configureRouter(config) {
    config.options.pushState = true;
    config.options.root = '/';
    config.map(this.routes);
  }
}
