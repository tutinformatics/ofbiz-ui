import {inject, customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class WorkspaceMenu {
  stringArray = ['crm', 'accounting', 'calendar', 'contacts', 'manufacturing', 'marketing', 'invoicing', 'facility'];
  assetPath = "/icons/";
  svgFile = ".svg";

  notactive = "";
  active = "-active";

  getUserSettings() {

  }

  saveUserSettings() {

  }


  getShuffleIcons() {

  }



}
