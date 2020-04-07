import '../../../assets/scss/affiliate-manager.scss';
import {bindable} from "aurelia-templating";

export class Sidebar {

  @bindable() current;

  navigateTo(navigateNext) {
    this.current = navigateNext;
  }

}
