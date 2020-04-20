import {inject, customElement, bindable, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DndService} from 'bcx-aurelia-dnd';
import _ from 'lodash';
import autoScroll from 'dom-autoscroller';

@inject(DndService, EventAggregator)
export class WorkspaceMenu {
  @bindable type = '';

  favorites = [
      { wsId: '1', name: 'My Workspace', styles: 'bg-1', favorite: true, links: ''},
      { wsId: '2', name: 'Workspace 1', styles: 'bg-3', favorite: true, links: ''},
      { wsId: '3', name: 'Workspace 2', styles: 'bg-2', favorite: true, links: ''},
      { wsId: '4', name: 'Space', styles: 'bg-3', favorite: true, links: ''},
      { wsId: '5', name: 'HMMMMMM', styles: 'bg-2', favorite: true, links: ''},
      { wsId: '6', name: 'Workspace 3', styles: 'bg-1', favorite: true, links: ''}
    ];


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

  constructor(dndService, ea) {
    this.dndService = dndService;
    this.ea = ea;
  }

  @bindable
  changeList(thing) {
    console.log(thing);
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
