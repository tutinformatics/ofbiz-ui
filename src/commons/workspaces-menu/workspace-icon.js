import {inject, customElement, bindable} from 'aurelia-framework';
import {autoinject} from "aurelia-dependency-injection";


@customElement('workspace-icon')
export class WorkspaceIcon {
  @bindable elemName = '';
  @bindable color = '';
  @bindable favorite;
  @bindable styles = '';
  @bindable links = '';

  constructor() {
    document.addEventListener('aurelia-composed', () => {
      this.favorite = (this.favorite == 'true');
      this.isFavorite();
    });
  }

  isFavorite() {
    if(this.favorite == "true" || this.favorite == true){
      this.favorite = true;
      console.log('is true');
    } else {
      this.favorite = false;
      console.log('is false');
    }
    console.log(this.favorite);
  }

  favoriteChanged(newValue, oldValue) {
    console.log(this.favorite);
    console.log(oldValue);
  }

  handleRemoveFav() {
    this.favorite = false;
  }

  mouseOver() {
    this.isFavorite();
  }

  mouseOut() {
  }

  /*styleChange(newValue, oldValue) {
    this.className = this.className - oldValue;
    this.className = this.className + newValue;
    console.log(this.className);
  }*/

  @bindable
  callback = (elemName) => {};
}
