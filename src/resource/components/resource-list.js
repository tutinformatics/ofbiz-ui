import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResourceEntities } from '../entities/resource-entities';
import { activationStrategy } from 'aurelia-router';

@inject(Router, ResourceEntities)
export class ResourceList {
  constructor(router, resourceEntities) {
    this.router = router;
    this.resourceEntities = resourceEntities;
  }

  activate(params, routeConfig) {
    routeConfig.navModel.setTitle(`Party ID: ${params.id}`);

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
            partyId: { type: 'string' }
          }
        }
      }
    };
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
