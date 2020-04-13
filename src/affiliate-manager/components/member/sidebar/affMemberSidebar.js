import '../../../assets/scss/sidebar.scss';
import { bindable } from 'aurelia-framework';

export class AffMemberSidebar {

  @bindable current;

  AffMemberSidebar() {
    this.opened = true;
  }

  navigateTo(navigateNext) {
    this.current = navigateNext;
  }

  slide() {
    this.opened = !this.opened;
  }

}
