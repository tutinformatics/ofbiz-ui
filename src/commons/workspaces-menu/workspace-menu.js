import {inject, customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class WorkspaceMenu {
  @bindable type = '';

  stringArray = [
      { name: 'My Workspace', color: 'blue', image: 'https://free-images.com/sm/cfd6/gesanghua_scenery_small_fresh.jpg', favorite: true},
      { name: 'Workspace 1', color: 'red', image: 'https://www.macupdate.com/images/user_img/3002188', favorite: false},
      { name: 'Workspace 2', color: 'orange', image: '', favorite: true}];


  addToFavorites(element) {
    for (var i = 0; i < stringArray.length; i++) {
      if (element == stringArray[i].name) {
        this.favoritesArray.push(stringArray[i]);
      }
    }

  }

  print() {
    for (var i = 0; i < this.stringArray.length; i++) {
      console.log(this.stringArray[i].name);
    }
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
  callback = (thing) => {
    console.log(thing);
  };
}
