import '../assets/scss/affiliate-manager.scss';
import {bindable} from "aurelia-templating";

export class AffiliateManager {
  @bindable() current;

  constructor(ea) {
    this.sidebarIsOpen = false;
    this.current = "Become-partner";
  }

  toggleSideBar() {
    this.sidebarIsOpen = !this.sidebarIsOpen;
  }

}
