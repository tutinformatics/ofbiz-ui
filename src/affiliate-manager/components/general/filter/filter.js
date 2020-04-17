import { bindable } from "aurelia-framework";

export class Filter {

  @bindable valuesToFilter;
  @bindable options;
  @bindable callback;
  @bindable id;
  selected;

  setFilteredValues(filterInput) {
    if (this.selected && filterInput !== '') {
      const filteredValues = this.valuesToFilter.filter(
        value => value[this.selected].toLowerCase().startsWith(filterInput.toLowerCase())
      );
      this.callback(filteredValues);
    } else {
      this.callback(this.valuesToFilter);
    }
  }
}
