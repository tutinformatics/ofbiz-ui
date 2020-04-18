import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';

@inject(Router)
export class Navbar {
  constructor(router) {
    this.router = router;
    this.currentApp = '';
  }

  setCurrentApp(appName) {
    this.currentApp = appName;
    this.router.navigate(this.currentApp);
  }
}
