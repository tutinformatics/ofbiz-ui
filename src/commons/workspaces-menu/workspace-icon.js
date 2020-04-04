import {inject, customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from "aurelia-dependency-injection";

@inject(EventAggregator)
@inject(Element)
@customElement('workspace-icon')
export class WorkspaceIcon {
  @bindable elemName = '';
  @bindable color = '';
  @bindable favorite = false;
  constructor() {
  }

  mouseOver() {
  }

  mouseOut() {
  }

  @bindable
  callback = (val) => {};
}
