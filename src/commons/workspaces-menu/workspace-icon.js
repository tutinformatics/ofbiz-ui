import { inject, customElement, bindable } from 'aurelia-framework';
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
  showclose = true;
  workspaceService;

  constructor(workspaceService) {
    /*document.addEventListener('aurelia-composed', () => {
      this.favorite = (this.favorite == 'true');
      this.isFavorite();
    });*/
    this.workspaceService = workspaceService;
  }

  handleRemoveFav() {
    //console.log(this.wsId);
    this.favorite = false;
    this.workspaceService.removeWorkspace(this.wsId);
  }

  mouseOver() {
    this.showclose = true;
    //this.isFavorite();
  }

  mouseOut() {
    this.showclose = false;
  }
}
