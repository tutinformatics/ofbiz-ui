import { bindable } from 'aurelia-framework';

export class Header {

  @bindable opened;

  toggleSidebar() {
    this.opened = !this.opened;
  }

}
