import {inject, customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from "aurelia-dependency-injection";

@inject(EventAggregator)
@inject(Element)
@customElement('button-icon')
export class WorkspaceIcon {
  @bindable elemName = '';

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
  }

  mouseOut() {
    this.element.active = '';
  }
}
