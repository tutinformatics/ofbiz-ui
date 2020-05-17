import { inject } from 'aurelia-framework';
import { WorkspaceService } from './workspace-service';
import { Store } from 'aurelia-store';
import { AppRouter } from 'aurelia-router';

@inject(WorkspaceService, Store, AppRouter)
export class WorkspaceFavourite {
  constructor(workspaceService, store, router) {
    this.workspaceService = workspaceService;
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => (this.workspaces = state.workspaces)
    );
    this.router = router;
  }

  get isFavourite() {
    const url = this.router.currentInstruction.fragment;
    return this.workspaces.some((x) => x.url === url);
  }

  handleFavorite() {
    this.workspaceService.addWorkspace();
  }

  detached() {
    this.subscription.unsubscribe();
  }
}
