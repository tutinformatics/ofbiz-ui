import {bindable} from "aurelia-framework";

export class SelectValue {
  @bindable
  options;
  @bindable
  selected;
}
