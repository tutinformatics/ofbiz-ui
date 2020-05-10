import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ProjectService } from '../services/project-service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@inject(Router, ProjectService)
export class ProjectList {

  attached() {
    const grid = document.querySelector('vaadin-grid');
    this.projectService
      .getProjectList()
      .then((response) => {
          response.map(
            project => {
              project.currentStatusId = !!project.currentStatusId ? project.currentStatusId : 'UNKNOWN'; //TODO: change this workaround
            }
          );
          grid.items = response;
        }
      );
  }

  constructor(router, projectService) {
    this.router = router;
    this.projectService = projectService;
    this.faPlus = faPlus;
  }

  handleAddProject() {
    this.router.navigate('new-project');
  }
  handleSelectProject(projectId){
    console.log(projectId);
  }
}
