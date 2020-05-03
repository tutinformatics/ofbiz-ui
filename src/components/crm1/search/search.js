import {bindable} from 'aurelia-framework';

export class search {
  @bindable execute;
  @bindable delay;
  timeoutHandle;

  executeSearch() {
    clearTimeout(this.timeoutHandle);
    this.execute({ query: this.query });
  }

  _query = '';
  get query() {
    return this._query;
  }
  set query(newValue) {
    this._query = newValue;
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => this.executeSearch(), this.delay);
  }
}
