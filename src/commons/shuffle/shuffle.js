import {inject, customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Shuffle {
  stringArray = ['crm', 'accounting', 'calendar', 'contacts', 'manufacturing', 'marketing', 'invoicing'];
  assetPath = "/icons/" //"/src/resources/icons/";
  svgFile = ".svg";

  notactive = "";
  active = "-active";


  parentMethod($event) {
    this.active = $event.detail;
  }



  getUserSettings() {

  }

  saveUserSettings() {

  }


  getShuffleIcons() {

  }

  mouseOver(elem) {
    //this.active = "-active";
    //console.log(document.getElementById(id).src);
    //console.log(document.getElementById('shuffle-menu'));
    //document.getElementById(id.id).src = this.assetPath + id + this.active + this.svgFile;
    console.log('element id: ' + elem.id);
    //elem.src = this.assetPath + 'crm' + this.active + this.svgFile;
    /*var event = new CustomEvent('mouseover', {
      detail: this.active,
      bubbles: true
    });

    this.element.dispatchEvent(event);*/
  }

  mouseOut(elem) {
    console.log('element id: ' + elem.id);
    //elem.src = this.assetPath + 'crm' + this.notactive + this.svgFile;
    //document.getElementById(id.id).src = this.assetPath + id + this.notactive + this.svgFile;
    //this.active = "";
  }



}
