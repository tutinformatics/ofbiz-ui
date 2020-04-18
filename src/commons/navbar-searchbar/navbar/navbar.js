import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { safeGet } from '../../util/utility';

@inject(Router, EventAggregator)
export class Navbar {
  constructor(router, ea) {
    this.router = router;
    this.currentProduct = '';
    this.ea = ea;
  }

  created() {
    this.subscription = this.ea.subscribe('router:navigation:complete', () => {
      let product = safeGet(() => this.router.currentInstruction.config.name, '');
      this.currentProduct = product;
    });
  }

  setCurrentProduct({ url }) {
    if (!url) {
      return;
    }
    this.router.navigate(url);
  }

  deactivate() {
    this.subscription.dispose();
  }
}
