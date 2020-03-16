import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Shuffle {

  stringArray = ['crm', 'accounting', 'calendar', 'contacts'];

  assetPath = "/icons/" //"/src/resources/icons/";
  svgFile = ".svg";
  active = "";



  getUserSettings() {

  }

  saveUserSettings() {

  }


  getShuffleIcons() {

  }

  mouseOver() {
    this.active = "-active";
  }

  mouseOut() {
    this.active = "";
  }

}
