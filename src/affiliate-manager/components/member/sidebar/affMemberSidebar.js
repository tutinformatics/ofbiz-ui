import '../../../assets/scss/sidebar.scss';
import { bindable } from 'aurelia-framework';

export class AffMemberSidebar {

  @bindable current;
  @bindable opened;

  navigateTo(navigateNext) {
    this.current = navigateNext;
  }

}
