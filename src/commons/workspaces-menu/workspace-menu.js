import { inject } from 'aurelia-framework';
import { DndService } from 'bcx-aurelia-dnd';
import autoScroll from 'dom-autoscroller';
import { Router } from 'aurelia-router';
import { WorkspaceService } from './workspace-service';
import { observable } from 'aurelia-binding';
import { Store } from 'aurelia-store';
import { setWorkspaces } from '../../store/store';

@inject(DndService, Router, Store, WorkspaceService)
export class WorkspaceMenu {
  @observable userLoginId;

  constructor(dndService, router, store, workspaceService) {
    this.dndService = dndService;
    this.router = router;
    this.workspaceService = workspaceService;
    this.store = store;
    this.store.registerAction('setWorkspaces', setWorkspaces);
    this.subscription = this.store.state.subscribe((state) => {
      this.workspaces = state.workspaces;
      this.userLoginId = state.userLoginId;
    });
  }

  attached() {
    this.scroll = autoScroll([this.container], {
      margin: 30,
      maxSpeed: 5,
      scrollWhenOutside: true,
      autoScroll: () =>
        this.dndService.isProcessing &&
        this.dndService.model.type === 'bcx-aurelia-reorderable-repeat:demo'
    });
  }

  userLoginIdChanged(newUserLoginId) {
    if (!newUserLoginId) {
      return;
    }
    this.workspaceService.getWorkspaceList({ userId: newUserLoginId });
  }

  handleSelect({ url }) {
    if (!!url) {
      this.router.navigate(url);
    }
  }

  detached() {
    this.subscription.unsubscribe();
    if (this.scroll) {
      this.scroll.destroy(true);
      delete this.scroll;
    }
  }
}
