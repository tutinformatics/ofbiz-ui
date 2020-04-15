import '../../../assets/scss/sidebar.scss';
import { bindable } from 'aurelia-framework';

export class AffGuestSidebar {

  @bindable current;
  @bindable opened;

  navigateTo(navigateNext) {
    this.current = navigateNext;
  }

  slide() {
    this.opened = !this.opened;
  }

}
