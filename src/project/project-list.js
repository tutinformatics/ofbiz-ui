import {inject} from "aurelia-dependency-injection";
import {Router} from "aurelia-router";
import {ProjectService} from "./project-service";


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
  }

  handleAddProject() {
    this.router.navigate('/new-project');
  }

  goToProjectView(event, projectId) {
    event.preventDefault();
    this.router.navigate(`projects/${projectId}`);
  }
}
