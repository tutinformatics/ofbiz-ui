import {inject, customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from "aurelia-dependency-injection";

@inject(EventAggregator)
@inject(Element)
@customElement('favorite-icon')
export class FavoriteIcon {
  @bindable elemName = '';
  @bindable color = '';

  constructor() {
  }

  mouseOver() {
  }

  mouseOut() {
  }
}
