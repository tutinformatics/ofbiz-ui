import { inject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { TimesheetService } from "../services/timesheet-service.js";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { convertStatus, getStatusBadge } from "../../../commons/util/status-utils.js";

@inject(Router, TimesheetService)
export class TimesheetList {
  constructor(router, timesheetService) {
    this.router = router;
    this.timesheetService = timesheetService;
    this.faPlus = faPlus;
  }

  attached() {
    const grid = document.querySelector("vaadin-grid");
    this.initGridColumns();
    this.timesheetService
      .getTimesheetList()
      .then((response) => (grid.items = response));
  }

  initGridColumns() {
    const columns = document.querySelectorAll('vaadin-grid-column');
    columns[3].renderer = (root, columnm, rowData) => {
      const status = rowData.item.statusId;
      root.innerHTML = `
          <span class="badge ${getStatusBadge(status)}">
            ${convertStatus(status)}
          </span >
        `;
    };
  }

  handleAddTimesheet() {
    this.router.navigate("new-timesheet");
  }
}
