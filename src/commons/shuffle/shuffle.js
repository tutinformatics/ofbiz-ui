import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";

@inject(Router)
export class Shuffle {
  stringArray = ['crm', 'accounting', 'calendar', 'contacts', 'manufacturing', 'marketing', 'invoicing', 'facility'];
  assetPath = "/icons/";
  svgFile = ".svg";

  constructor(router) {
    this.router = router;
  }

  notactive = "";
  active = "-active";

  getUserSettings() {

  }

  saveUserSettings() {

  }


  getShuffleIcons() {

  }

  redirectTo(s) {
    if (s === 'marketing') {
      this.router.navigate('/affiliate-manager');
    }
  }

}
