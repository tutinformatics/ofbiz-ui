import {inject, customElement, bindable, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DndService} from 'bcx-aurelia-dnd';
import _ from 'lodash';
import autoScroll from 'dom-autoscroller';

@inject(DndService, EventAggregator)
export class WorkspaceMenu {
  @bindable type = '';

  favorites = [
      { id: '', name: 'My Workspace', styles: 'bg-1', favorite: true, links: ''},
      { id: '', name: 'Workspace 1', styles: 'bg-3', favorite: true, links: ''},
      { id: '', name: 'Workspace 2', styles: 'bg-2', favorite: true, links: ''},
      { id: '', name: 'Space', styles: 'bg-3', favorite: true, links: ''},
      { id: '', name: 'HMMMMMM', styles: 'bg-2', favorite: true, links: ''},
      { id: '', name: 'Workspace 3', styles: 'bg-1', favorite: true, links: ''}
    ];

  addToFavorites(element) {
    for (var i = 0; i < stringArray.length; i++) {
      if (element == stringArray[i].name) {
        this.favorites.push(favorites[i]);
      }
    }
  }

  print() {
    for (var i = 0; i < this.favorites.length; i++) {
      console.log(this.favorites[i].name + ' ' + this.favorites[i].favorite);
    }
  }

  favoritesChanged(newValue, oldValue) {
    console.log("changed");
    for (var i = 0; i < newValue.length; i++) {
      console.log(this.favorites[i].name + ' ' + this.favorites[i].favorite);
    }
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
