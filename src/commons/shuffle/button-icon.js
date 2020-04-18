import { customElement, bindable } from 'aurelia-framework';

@customElement('button-icon')
export class ButtonIcon {
  @bindable elemName = '';

  assetPath = '/icons/';
  svgFile = '.svg';
  active = '';

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
