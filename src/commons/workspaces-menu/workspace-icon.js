import {inject, customElement, bindable, observable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from "aurelia-dependency-injection";

@inject(EventAggregator)
@inject(Element)
@customElement('workspace-icon')
export class WorkspaceIcon {
  @bindable elemName = '';
  @bindable color = '';
  @bindable favorite = false;

  fav = this.favorite;

  constructor() {

  }

  mouseOver() {
    console.log(this.favorite);
  }

  mouseOut() {
  }

  @bindable
  callback = (val) => {};
}
