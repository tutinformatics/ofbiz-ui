import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ProjectService } from '../services/project-service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@inject(Router, ProjectService)
export class ProjectList {
  datasource = {
    transport: {
      read: (options) => {
        this.projectService.getProjectList()
          .then(projects => options.success(projects));
      }
    }
  };

  constructor(router, projectService) {
    this.router = router;
    this.projectService = projectService;
    this.faPlus = faPlus;
  }

  handleAddProject() {
    this.router.navigate('new-project');
  }
}
