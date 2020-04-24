import { bindable } from "aurelia-framework";
import "./selectValue.scss"

export class SelectValue {

  @bindable options;
  @bindable selected;
  @bindable callback;
  @bindable id;
  @bindable labelText

}
