import { bindable } from 'aurelia-framework';

export class Header {

  @bindable opened;

  toggleSidebar() {
    console.log(this.opened);
    this.opened = !this.opened;
  }

}
