import { bindable } from 'aurelia-framework';

export class Shuffle {
  @bindable selectProduct;

  // TODO: should not be hard-coded, but come from BE?
  products = [
    {
      text: 'project',
      url: 'project'
    },
    {
      text: 'crm',
      url: '' // TODO: replace with proper url
    },
    {
      text: 'accounting',
      url: ''
    },
    {
      text: 'contacts',
      url: ''
    },
    {
      text: 'manufacturing',
      url: ''
    },
    {
      text: 'marketing',
      url: ''
    },
    {
      text: 'invoicing',
      url: ''
    }
  ];

  handleSelect(product) {
    this.selectProduct({ product: product });
  }
}
