import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResourceService } from '../services/resource-service';

@inject(Router, ResourceService)
export class ProjectEditComponent {
  constructor(router, resourceServices) {
    this.router = router;
    this.resourceServices = resourceServices;
    this.resource = {};
    this.datasource = {
      transport: {
        read: (options) => {
          this.resourceServices.getRolesList({parentTypeId:'PROJECT_TEAM'})
            .then((resource) => {
              options.success(resource);
          });
        }
      }
    };
  }

  get canSave() {
    return !!this.resource.partyId;
  }

  addResource() {
    this.resourceServices.createResource(this.resource)
      .then(() => this.router.navigate(''));
  }

  handleBack() {
    this.router.navigateBack();
  }
}
