import { bindable } from 'aurelia-framework';
import './affHeader.scss';

export class AffHeader {

  @bindable opened;

  toggleSidebar() {
    console.log(this.opened);
    this.opened = !this.opened;
  }

}
