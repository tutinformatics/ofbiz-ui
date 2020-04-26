import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DndService } from 'bcx-aurelia-dnd';
import autoScroll from 'dom-autoscroller';
import { WorkspaceService } from './workspace-service';
import { Router } from 'aurelia-router';

@inject(DndService, EventAggregator, WorkspaceService, Router)
export class WorkspaceMenu {
  @bindable type = '';

  favorites = [];

  constructor(dndService, ea, workspaceService, router) {
    this.dndService = dndService;
    this.ea = ea;
    this.workspaceService = workspaceService;
    this.router = router;
  }

  created() {
    this.loadWorkspaces();
  }

  loadWorkspaces() {
    this.workspaceService
      .getWorkspaceList({ userId: 'ADMIN' }) //TODO: should not be hardcoded
      .then((response) => (this.favorites = response));
  }

  print() {}

  attached() {
    this.scroll = autoScroll([this.container], {
      margin: 30,
      maxSpeed: 5,
      scrollWhenOutside: true,
      autoScroll: () =>
        this.dndService.isProcessing &&
        this.dndService.model.type === 'bcx-aurelia-reorderable-repeat:demo'
    });
  }

  handleSelect({ url }) {
    if (!!url) {
      this.router.navigate(url);
    }
  }

  detached() {
    if (this.scroll) {
      this.scroll.destroy(true);
      delete this.scroll;
    }
  }
}
