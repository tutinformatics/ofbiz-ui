import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';
import { Router } from "aurelia-router";

@inject(Router)
export class Shuffle {
  @bindable selectProduct;

  constructor(router) {
    this.router = router;
  }

  // TODO: should not be hard-coded, but come from BE?
  products = [
    {
      name: 'project',
      url: 'project'
    },
    {
      name: 'crm',
      url: '' // TODO: replace with proper url
    },
    {
      name: 'accounting',
      url: ''
    },
    {
      name: 'contacts',
      url: ''
    },
    {
      name: 'manufacturing',
      url: ''
    },
    {
      name: 'marketing',
      url: 'affiliate-manager'
    },
    {
      name: 'invoicing',
      url: ''
    },
    {
      name: 'MQTT',
      url: 'object-dist'
    }
  ];

  handleSelect(product) {
    this.selectProduct({ product: product });
  }

}
