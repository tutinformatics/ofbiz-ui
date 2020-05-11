import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResourceService } from '../services/resource-service';

@inject(Router, ResourceService)
export class ProjectEditComponent {
  constructor(router, resourceService) {
    this.router = router;
    this.resourceServices = resourceService;
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
    // TODO: first, search party component has to be implemented
  }

  handleBack() {
    this.router.navigateBack();
  }
}
