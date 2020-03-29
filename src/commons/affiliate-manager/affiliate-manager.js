import './styles/scss/affiliate-manager.scss';
import {bindable} from "aurelia-templating";

export class AffiliateManager {
  @bindable() current;

  constructor(ea) {
    this.sidebarIsOpen = false;
    this.current = "About";
  }

  toggleSideBar() {
    this.sidebarIsOpen = !this.sidebarIsOpen;
  }

}
