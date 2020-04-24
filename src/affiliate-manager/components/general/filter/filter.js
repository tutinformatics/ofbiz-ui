import { bindable } from "aurelia-framework";
import "../../../assets/scss/filter.scss"

export class Filter {

  @bindable valuesToFilter;
  @bindable options;
  @bindable callback;
  @bindable id;
  selectedKey;
  selectedValue = 'Choose';

  setFilteredValues(filterInput) {
    if (this.selectedKey && filterInput !== '') {
      const filteredValues = this.valuesToFilter.filter(
        value => `${value[this.selectedKey]}`.toLowerCase().startsWith(filterInput.toLowerCase())
      );
      this.callback(filteredValues);
    } else {
      this.callback(this.valuesToFilter);
    }
  }

  setSelected(key, value) {
    this.selectedKey = key;
    this.selectedValue = value;
    if (value === null) {
      this.selectedValue = 'Choose';
    }
  }
}
