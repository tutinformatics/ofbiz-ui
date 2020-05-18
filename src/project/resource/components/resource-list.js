import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResourceService } from '../services/resource-service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


@inject(Router, ResourceService)
export class ResourceList {
  constructor(router, resourceService) {
    this.faPlus = faPlus;
    this.faFilter = faFilter;
    this.router = router;
    this.resourceService = resourceService;
  }

  attached() {
    const grid = document.querySelector('vaadin-grid');
    this.resourceService
      .getResourceList({ roleTypeId: 'PROJECT_TEAM' })
      .then((response) => grid.items = response
      );
  }

  handleAddResource() {
    this.router.navigate('new-resource');
  }
  async filterResource() {
    const grid = document.querySelector('vaadin-grid');
    const nameValue = document.getElementById("filtername").value;
    const typeValue = document.getElementById("filtertype").value;
    const filterValue = document.getElementById("filtervalue").value;
    console.log(nameValue);
    console.log(typeValue);
    console.log(filterValue);
    this.resourceService
      .getFilteredResource(nameValue, typeValue, filterValue)
      .then((response) => grid.items = response
      );
  }
}
