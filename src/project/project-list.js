import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import 'bootstrap';
import { ProjectService } from './project-service';
import {Filter} from "../commons/filter/filter";


@inject(Router, ProjectService, Filter)
export class ProjectList {

  filter;

  datasource = {
    transport: {
      read: (options) => {
        this.projectService.getProjectList()
          .then(projects => options.success(projects));
      }
    }
  };

  constructor(router, projectService, filter) {
    this.router = router;
    this.projectService = projectService;
    this.filter = filter;
  }

  handleAddProject() {
    this.router.navigate('/new-project');
  }
  filterList(){
    const filterComponents = document.querySelectorAll('smart-query-builder');
    const filterComponent = filterComponents[0];
    const filterValues = filterComponent.value;
    const filters = [];
    for (let i = 0; i < filterValues.length; i++) {
      if (typeof filterValues[i] == "object") {
        let filter = {};
        for (let j = 0; j < filterValues[i].length; j++) {
          const data = filterValues[i][j];
          if (typeof data == "object") {
            filter[data[0]] = [data[2]];
          }
        }
        filters.push(filter)
      }
    }
    console.log(filters);
  }
}
