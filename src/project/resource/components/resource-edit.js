import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResourceEntities } from '../entities/resource-entities';

@inject(Router, ResourceEntities)
export class ProjectEditComponent {
  constructor(router, resourceEntities) {
    this.router = router;
    this.resourceEntities = resourceEntities;
    this.resource = {
    };
    this.roleList = [{
      text: 'Part of a project',
      value: 'PROJECT_TEAM'
    }];
  }

  get canSave() {
    return !!this.project.workEffortName;
  }

  addResource() {
    this.resourceEntities.createResource(this.resource)
      .then(() => this.router.navigate(''));
  }

  handleBack() {
    this.router.navigateBack();
  }
}
