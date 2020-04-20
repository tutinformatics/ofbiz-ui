import {inject, customElement, bindable} from 'aurelia-framework';
import {autoinject} from "aurelia-dependency-injection";
import { WorkspaceService } from './workspace-service';


@customElement('workspace-icon')
@inject(WorkspaceService)
export class WorkspaceIcon {
  @bindable wsId = 'no id';
  @bindable elemName = '';
  @bindable color = '';
  @bindable favorite;
  @bindable styles = '';
  @bindable links = '';
  showclose = false;



  constructor(projectService) {
    /*document.addEventListener('aurelia-composed', () => {
      this.favorite = (this.favorite == 'true');
      this.isFavorite();
    });*/
    this.projectService = projectService;
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
    // console.log(this.favorite);
    // console.log(oldValue);
  }

  handleRemoveFav() {
    console.log(this.wsId);
    this.favorite = false;
    this.projectService.removeWorkspace(this.wsId);
  }

  mouseOver() {
    this.showclose = true;
    //this.isFavorite();
  }

  mouseOut() {
    this.showclose = false;
  }

  /*styleChange(newValue, oldValue) {
    this.className = this.className - oldValue;
    this.className = this.className + newValue;
    console.log(this.className);
  }*/

  @bindable
  callback = (elemName) => {};
}
