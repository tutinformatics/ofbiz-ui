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


  print() {
    var list = [];
    for (var i = 0; i < this.favorites.length; i++) {
      list.push(this.favorites[i].wsId);
    }
    console.log(list);
  }

  removeFromFavorites(element) {
    for (var i = 0; i < favoritesArray.length; i++) {
      if (element.id == favoritesArray[i].id) {
        this.favoritesArray.pop(i);
      }
    }
  }

  constructor(dndService, ea, workspaceService) {
    this.dndService = dndService;
    this.ea = ea;
    this.favorites = workspaceService.getWorkspaceList('userId');
  }

  @bindable
  changeList(thing) {
    console.log(thing + ' miracle has happened');
  };

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
