import { inject } from 'aurelia-dependency-injection';
import { ProjectService } from '../services/project-service';
import { Router } from 'aurelia-router';

@inject(Router, ProjectService)
export class ProjectEditComponent {
  constructor(router, projectService) {
    this.router = router;
    this.projectService = projectService;
    this.project = {
      workEffortName: '',
      currentStatusId: '_NA_',
      workEffortTypeId: 'PROJECT',
      scopeEnumId: 'WES_CONFIDENTIAL',
      workEffortParentId: '9001'
    };
    this.parentProjectList = [{
      text: 'Demo Project Cust1',
      value: '9001'
    }];
    this.scopeList = [{
      text: 'General, public access',
      value: 'PROVIDER_MANAGER'
    },
    {
      text: 'Restricted, private access',
      value: 'PROVIDER_MANAGER'
    },
    {
      text: 'Very restricted, confidential access',
      value: 'WES_CONFIDENTIAL'
    }];
  }

  get canSave() {
    return !!this.project.workEffortName;
  }

  addProject() {
    this.projectService.createProject(this.project)
      .then(() => this.router.navigate('/projects'));
  }

  handleBack() {
    this.router.navigateBack();
  }
}
