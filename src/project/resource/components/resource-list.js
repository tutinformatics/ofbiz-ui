import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResourceService } from '../services/resource-service';
import { activationStrategy } from 'aurelia-router';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

@inject(Router, ResourceService)
export class ResourceList {
  constructor(router, resourceServices) {
    this.button = faPlus;
    this.router = router;
    this.resourceServices = resourceServices;
  }

  activate(params, routeConfig) {
    routeConfig.navModel.setTitle(`Resources`);

    this.datasource = {
      transport: {
        read: (options) => {
          this.resourceServices
            .getResourceList({roleTypeId:'PROJECT_TEAM'})
            .then((resource) => {
              options.success(resource);
            });
        }
      },
      schema: {
        model: {
          fields: {
            partyId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' }
          }
        }
      }
    };
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  handleAddResource() {
    this.router.navigate('new-resource');
  }
}
