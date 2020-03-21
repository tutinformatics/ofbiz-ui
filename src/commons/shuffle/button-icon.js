import {inject, customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from "aurelia-dependency-injection";

@inject(EventAggregator)
@inject(Element)
@customElement('button-icon')
export class ButtonIcon {
  @bindable elemName = '';
  stringArray = ['crm', 'accounting', 'calendar', 'contacts', 'manufacturing'];

  assetPath = "/icons/";
  svgFile = ".svg";
  active = "";
  namething = '';



  constructor() {
    this.element = {
          active: ''
        };
  }
  x;
  mouseOver() {
    this.element.active = '-active';
    //this.x = document.getElementById('shuffle-menu').querySelectorAll("button-icon");
    //console.log(document.getElementById('shuffle-menu').querySelectorAll("button-icon"));
    //this.x.style.width = 100;
    /*var event = new CustomEvent('mouseover', {
      detail: this.active,
      bubbles: true
    });

    this.element.dispatchEvent(event);*/
  }

  mouseOut() {
    this.element.active = '';
  }
  /*iconArray = {
    [
      {name:"cmr"},
      {path:this.assetPath + "cmr" + this.iconArray.cmr.active + this.svgFile},
      {active:""}
    ],
    [
      {name:"accounting"},
      {path:this.assetPath + "accounting" + this.iconArray.cmr.active + this.svgFile},
      {active:""}
    ],
    [
      {name:"calendar"},
      {path:this.assetPath + "calendar" + this.iconArray.cmr.active + this.svgFile},
      {active:""}
    ],
    [
      {name:"contacts"},
      {path:this.assetPath + "contacts" + this.iconArray.cmr.active + this.svgFile},
      {active:""}
    ]
};*/
}
