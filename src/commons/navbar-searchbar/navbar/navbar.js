import {inject, customElement, bindable} from 'aurelia-framework';
import {autoinject} from "aurelia-dependency-injection";
import { WorkspaceService } from '../../workspaces-menu/workspace-service';

@inject(WorkspaceService)
export class Navbar {
  workspaceService;

  constructor(workspaceService) {
    this.workspaceService = workspaceService;
  }

  handleStarIcon() {
    var url = window.location.href;
    return this.workspaceService.getAlreadyInMenu(url);
  }

  handleFavorites() {
    var url = window.location.href;
    var name = url.split('/')[url.split('/').length - 1];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    this.workspaceService.addWorkspace(name, url);
  }

}
