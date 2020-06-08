import { inject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { TimesheetService } from "../services/timesheet-service.js";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { convertStatus, getStatusBadge } from "../../../commons/util/status-utils.js";

@inject(Router, TimesheetService)
export class TimesheetList {
  constructor(router, timesheetService) {
    this.router = router;
    this.timesheetService = timesheetService;
    this.faPlus = faPlus;
    this.faFilter = faFilter;
  }

  attached() {
    const grid = document.querySelector("vaadin-grid");
    this.initGridColumns();
    this.timesheetService
      .getTimesheetList({ })
      .then((response) => (grid.items = response));
  }
  async filterTimesheet() {
    const grid = document.querySelector('vaadin-grid');
    const nameValue = document.getElementById("filtername").value;
    const typeValue = document.getElementById("filtertype").value;
    const filterValue = document.getElementById("filtervalue").value;
    this.timesheetService
      .getFilteredTimesheet(nameValue, typeValue, filterValue)
      .then((response) => grid.items = response
      );
  }

  initGridColumns() {
    const columns = document.querySelectorAll('vaadin-grid-column');

    columns[0].renderer = (root, column, rowData) => {
      const timesheetId = rowData.item.timesheetId;
      root.innerHTML = `<a href="javascript:void(0);">${timesheetId}<a/>`;
      root.addEventListener("click", () => this.handleSelectTimesheet(timesheetId));
    };

    columns[3].renderer = (root, columnm, rowData) => {
      const status = rowData.item.statusId;
      root.innerHTML = `
          <span class="badge ${getStatusBadge(status)}">
            ${convertStatus(status)}
          </span >
        `;
    };
  }

  handleSelectTimesheet(timesheetId) {
    this.router.navigateToRoute("timesheet-view", { id: timesheetId });
  }

  handleAddTimesheet() {
    this.router.navigate("new-timesheet");
  }
}
