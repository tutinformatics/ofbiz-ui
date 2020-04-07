import {inject, customElement, bindable} from 'aurelia-framework';
import {autoinject} from "aurelia-dependency-injection";

@customElement('button-icon')
export class ButtonIcon {
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

  mouseOver() {
    this.element.active = '-active';
  }

  mouseOut() {
    this.element.active = '';
  }
}
