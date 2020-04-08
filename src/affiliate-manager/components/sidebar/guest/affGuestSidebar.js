import './affGuestSidebar.scss';
import { bindable } from 'aurelia-framework';

export class AffGuestSidebar {

  @bindable current;
  @bindable opened;

  navigateTo(navigateNext) {
    this.current = navigateNext;
  }

}
