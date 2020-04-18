import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';

@inject(Router)
export class Navbar {
  constructor(router) {
    this.router = router;
    this.currentProduct = '';
  }

  setCurrentProduct({ text, url }) {
    if (!url) {
      return;
    }
    this.currentProduct = text;
    this.router.navigate(url);
  }
}
