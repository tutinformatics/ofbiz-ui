import { inject, bindable } from 'aurelia-framework';
import { DndService } from 'bcx-aurelia-dnd';
import autoScroll from 'dom-autoscroller';
import { Router } from 'aurelia-router';

@inject(DndService, Router)
export class WorkspaceMenu {
  @bindable workspaces = [];

  constructor(dndService, router) {
    this.dndService = dndService;
    this.router = router;
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

  handleSelect({ url }) {
    if (!!url) {
      this.router.navigate(url);
    }
  }

  detached() {
    if (this.scroll) {
      this.scroll.destroy(true);
      delete this.scroll;
    }
  }
}
