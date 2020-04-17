import '../../../assets/scss/sidebar.scss';
import { bindable } from 'aurelia-framework';

export class MemberSidebar {

  @bindable currentPage;
  @bindable opened;

  navigateTo(navigateNext) {
    this.currentPage = navigateNext;
  }

  slide() {
    this.opened = !this.opened;
  }

}
