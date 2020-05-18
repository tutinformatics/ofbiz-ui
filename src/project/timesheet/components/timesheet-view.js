import { inject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { activationStrategy } from "aurelia-router";
import { TimesheetService } from "../services/timesheet-service";
import { Store } from "aurelia-store";
import { getStatusBadge, convertStatus } from "../../../commons/util/status-utils";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@inject(Router, TimesheetService, Store)
export class TimesheetView {
  constructor(router, timesheetService, store) {
    this.router = router;
    this.timesheetService = timesheetService;
    this.timesheet = {};
    this.timesheets = {};
    this.tasks = {};
    this.rates = {};
    this.store = store;
    this.faPlus = faPlus;
    this.myTimes = {};
    this.store.state.subscribe(
      (state) => (this.state = state)
    );
  }

  activate(params, routeConfig) {
    this.params = params;
    routeConfig.navModel.setTitle(`Timesheet ID: ${params.id}`);

    this.timesheetService
      .getTimesheet({ timesheetId: params.id })
      .then((response) => (this.timesheet = response[0]));

    this.timesheetService
      .getRateTypes()
      .then((response) => (this.rates = response));

    this.timesheetService
      .getProjectAndPhaseAndTaskParty({ partyId: this.state.userLoginId })
      .then((response) => (this.tasks = response));
  }

  initGridColumns() {
    const gridTwo = document.getElementById("vaadin-grid-two");
    const columns = gridTwo.querySelectorAll('vaadin-grid-column');

    columns[0].renderer = (root, column, rowData) => {
      const timesheetId = rowData.item.timesheetId;
      root.innerHTML = `<a href="javascript:void(0);">${timesheetId}<a/>`;
      root.addEventListener("click", () => this.handleSelectTimesheet(timesheetId));
    };

    columns[3].renderer = (root, column, rowData) => {
      const status = rowData.item.statusId;
      root.innerHTML = `
          <span class="badge ${getStatusBadge(status)}">
            ${convertStatus(status)}
          </span >
        `;
    };

  }

  attached() {
    const grid = document.getElementById("vaadin-grid-two");

    this.initGridColumns();
    this.timesheetService
      .getTimesheetList({
        partyId: this.state.userLoginId
      })
      .then((response) => (grid.items = response));
  }

  handleAddTaskTime() {
    this.router.navigateToRoute("new-time");
  }

  handleSelectTimesheet(timesheetId) {
    this.router.navigateToRoute("timesheet-view", { id: timesheetId });
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
