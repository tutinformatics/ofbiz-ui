import { inject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { TaskService } from "../task/services/task-service";
import { activationStrategy } from "aurelia-router";
import { ProjectService } from "../services/project-service";
import { getStatusBadge, convertStatus } from "../../commons/util/status-utils";

@inject(Router, TaskService, ProjectService)
export class ProjectView {
  constructor(router, taskService, projectService) {
    this.router = router;
    this.taskService = taskService;
    this.projectService = projectService;
    this.project = {};
  }

  activate(params, routeConfig) {
    this.params = params;
    routeConfig.navModel.setTitle(`Project ID: ${params.id}`);

    this.projectService
      .getProject({ workEffortId: params.id })
      .then((response) => (this.project = response[0]));
  }

  attached() {
    const grid = document.querySelector("vaadin-grid");
    this.initGridColumns();
    this.taskService
      .getProjectTaskList({ projectId: this.params.id })
      .then((response) => (grid.items = response));
  }

  initGridColumns() {
    const columns = document.querySelectorAll("vaadin-grid-column");
    columns[2].renderer = (root, columnm, rowData) => {
      const status = rowData.item.currentStatusId;
      root.innerHTML = `
          <span class="badge ${getStatusBadge(status)}">
            ${convertStatus(status)}
          </span >
        `;
    };
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
