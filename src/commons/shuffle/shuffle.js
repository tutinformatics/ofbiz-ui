import { bindable } from 'aurelia-framework';

export class Shuffle {
  @bindable selectApp;
  // TODO: should not be hard-coded, but come from BE?
  products = [
    'crm',
    'accounting',
    'calendar',
    'contacts',
    'manufacturing',
    'marketing',
    'invoicing',
    'projects',
  ];

  handleSelect(product) {
    this.selectApp({ appName: product });
  }
}
