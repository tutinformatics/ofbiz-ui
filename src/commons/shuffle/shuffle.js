import { bindable } from 'aurelia-framework';

export class Shuffle {
  @bindable selectProduct;
  @bindable products;

  constructor() {}

  handleSelect(product) {
    this.selectProduct({ product: product });
  }
}
