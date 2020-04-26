import {inject, customElement, bindable, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DndService} from 'bcx-aurelia-dnd';
import _ from 'lodash';
import autoScroll from 'dom-autoscroller';
import { WorkspaceService } from './workspace-service';

@inject(DndService, EventAggregator, WorkspaceService)
export class WorkspaceMenu {
  @bindable type = '';

  favorites = [];

  constructor(dndService, ea, workspaceService) {
    this.dndService = dndService;
    this.ea = ea;
    this.workspaceService = workspaceService;
  }

  created() {
    this.workspaceService.getWorkspaceList({ userId: 'ADMIN' }) //TODO: should not be hardcoded
      .then(response => this.favorites = response);
  }

  print() {
    var list = [];
    for (var i = 0; i < this.favorites.length; i++) {
      list.push(this.favorites[i].wsId);
    }
    console.log(list);
  }

  attached() {
    this.scroll = autoScroll(
      [this.container],
      {
        margin: 30,
        maxSpeed: 5,
        scrollWhenOutside: true,
        autoScroll: () =>
          this.dndService.isProcessing &&
          this.dndService.model.type === 'bcx-aurelia-reorderable-repeat:demo'
      }
    );
  }

  detached() {
    if (this.scroll) {
      this.scroll.destroy(true);
      delete this.scroll;
    }
  }
}
