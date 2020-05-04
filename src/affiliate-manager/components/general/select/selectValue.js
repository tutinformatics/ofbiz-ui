import { bindable } from "aurelia-framework";
import "../../../assets/scss/filter.scss"

export class SelectValue {

  @bindable options;
  @bindable selectedKey;
  @bindable callback;
  @bindable id;
  @bindable labelText;
  @bindable selectedValue = 'Choose';

  setSelected(key, value) {
    console.log(this.selectedKey)
    this.selectedKey = key;
    this.selectedValue = value;
    if (this.selectedKey === null) {
      this.selectedValue = 'Choose';
    }
  }

}
