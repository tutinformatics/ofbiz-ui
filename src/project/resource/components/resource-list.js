import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResourceService } from '../services/resource-service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@inject(Router, ResourceService)
export class ResourceList {
  constructor(router, resourceService) {
    this.faPlus = faPlus;
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
}
