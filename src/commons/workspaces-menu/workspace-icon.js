import {inject, customElement, bindable} from 'aurelia-framework';
import {autoinject} from "aurelia-dependency-injection";


@customElement('workspace-icon')
export class WorkspaceIcon {
  @bindable elemName = '';
  @bindable color = '';
  @bindable favorite;
  @bindable image = '';

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

  isNotFavorite() {
    if(this.favorite == "false" || this.favorite == false){
      return true;
    } else {
      return false;
    }
  }

  mouseOver() {
    this.isFavorite();
  }

  mouseOut() {
  }

  @bindable
  callback = (elemName) => {};
}
