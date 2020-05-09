import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResourceEntities } from '../entities/resource-entities';
import { activationStrategy } from 'aurelia-router';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

@inject(Router, ResourceEntities)
export class ResourceList {
  constructor(router, resourceEntities, faP) {
    this.button = faPlus;
    this.router = router;
    this.resourceEntities = resourceEntities;
  }

  activate(params, routeConfig) {
    routeConfig.navModel.setTitle(`Resources`);

    this.datasource = {
      transport: {
        read: (options) => {
          this.resourceEntities
            .getResourceList()
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
