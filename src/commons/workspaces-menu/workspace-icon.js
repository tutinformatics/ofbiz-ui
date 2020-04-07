import {inject, customElement, bindable} from 'aurelia-framework';
import {autoinject} from "aurelia-dependency-injection";


@customElement('workspace-icon')
export class WorkspaceIcon {
  @bindable elemName = '';
  @bindable color = '';
  @bindable favorite;

  constructor() {
    document.addEventListener('aurelia-composed', () => {
      this.favorite = (this.favorite == 'true');
    });
  }

  isFavorite() {
    if(this.favorite == "true" || this.favorite == true){
      this.favorite = true;
    } else {
      this.favorite = false;
    }
  }

  mouseOver() {
    this.isFavorite();
  }

  mouseOut() {
  }

  @bindable
  callback = (val) => {};
}
