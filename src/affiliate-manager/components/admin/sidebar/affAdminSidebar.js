import './affAdminSidebar.scss';
import { bindable } from 'aurelia-framework';

export class AffAdminSidebar {

  @bindable current;
  @bindable opened;

  navigateTo(navigateNext) {
    this.current = navigateNext;
  }

}
