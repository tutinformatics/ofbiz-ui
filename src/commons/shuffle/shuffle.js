import { bindable } from 'aurelia-framework';

export class Shuffle {
  @bindable selectProduct;
  @bindable products;

  handleSelect(product) {
    this.selectProduct({ product: product });
  }
}
