import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ProjectService } from '../services/project-service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getStatusBadge, convertStatus } from '../../commons/util/status-utils';

@inject(Router, ProjectService)
export class ProjectList {
  constructor(router, projectService) {
    this.router = router;
    this.projectService = projectService;
    this.faPlus = faPlus;
  }

  attached() {
    const grid = document.querySelector('vaadin-grid');
    this.initGridColumns();
    this.projectService
      .getProjectList()
      .then((response) => (grid.items = response));
  }

  initGridColumns() {
    const columns = document.querySelectorAll('vaadin-grid-column');
    columns[0].renderer = (root, column, rowData) => {
      const projectId = rowData.item.projectId;
      root.innerHTML = `<a href="javascript:void(0);">${projectId}<a/>`;
      root.addEventListener('click', () => this.handleSelectProject(projectId));
    };

    columns[2].renderer = (root, column, rowData) => {
      const status = rowData.item.currentStatusId;
      root.innerHTML = `
          <span class="badge ${getStatusBadge(status)}">
            ${convertStatus(status)}
          </span >
        `;
    };
  }

  handleSelectProject(projectId) {
    this.router.navigateToRoute('project-view', { id: projectId });
  }

  handleAddProject() {
    this.router.navigate('new-project');
  }
}
