import {inject, customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class WorkspaceMenu {
  @bindable type = '';

  stringArray = [
      { name: 'My Workspace', color: 'blue', favorite: true},
      { name: 'Workspace 1', color: 'red', favorite: false}];


  addToFavorites(element) {
    for (var i = 0; i < stringArray.length; i++) {
      if (element == stringArray[i].name) {
        this.favoritesArray.push(stringArray[i]);
      }
    }

  }

  print(string) {
    console.log(string);
  }

  removeFromFavorites(element) {
    for (var i = 0; i < favoritesArray.length; i++) {
      if (element.id == favoritesArray[i].id) {
        this.favoritesArray.pop(i);
      }
    }
  }

  getUserSettings() {

  }

  saveUserSettings() {

  }


  getShuffleIcons() {

  }

  constructor() {

  }

  @bindable
  callback = val => {
    //addToFavorites(val);
    console.log(val);
  };
}
