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
  
  mouseOver() {
    this.element.active = '-active';
  }

  mouseOut() {
    this.element.active = '';
  }
}
