import { bindable } from 'aurelia-framework';

export class AffHeader {

  @bindable opened;

  toggleSidebar() {
    console.log(this.opened);
    this.opened = !this.opened;
  }

}
