import { inject } from "aurelia-dependency-injection";
import { TaskService } from "../services/task-service";
import { Store } from "aurelia-store";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Router } from "aurelia-router";
import { getStatusBadge, convertStatus } from "../../../commons/util/status-utils";

@inject(TaskService, Store, Router)
export class TaskList {
  constructor(taskService, store, router) {
    this.taskService = taskService;
    this.store = store;
    this.router = router;
    this.faPlus = faPlus;
    this.subscription = this.store.state.subscribe(
      (state) => (this.state = state)
    );
  }

  attached() {
    const grid = document.querySelector("vaadin-grid");
    this.initGridColumns();
    this.taskService
      .getTasks({
        partyId: this.state.userLoginId,
        statusId: "PAS_ASSIGNED",
      })
      .then((response) => (grid.items = response));
  }

  initGridColumns() {
    const columns = document.querySelectorAll("vaadin-grid-column");
    columns[6].renderer = (root, columnm, rowData) => {
      const status = rowData.item.statusId;
      root.innerHTML = `
          <span class="badge ${getStatusBadge(status)}">
            ${convertStatus(status)}
          </span >
        `;
    };
  }

  handleAddTask() {
    this.router.navigate("new-task");
  }
}
