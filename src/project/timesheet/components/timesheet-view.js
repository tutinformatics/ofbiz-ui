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
    this.rates = {};
    this.store = store;
    this.tasks = {};
    this.faPlus = faPlus;
    this.myTimes = {};
    this.subscription = this.store.state.subscribe(
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
    const timetable = document.getElementById("vaadin-grid-one");
    //const grid = document.querySelector("vaadin-grid");

    const columns = timetable.querySelectorAll('vaadin-grid-column');

    this.initGridColumns();
    this.timesheetService
      .getTimesheetList({
        partyId: this.state.userLoginId
      })
      .then((response) => (grid.items = response));
      //TODO: Add logic to get only items with parameter 'actualMilliSeconds' being not null
    // this.timesheetService
    //   .getMyTime({ workEffortTypeId: 'TASK', partyId: this.state.userLoginId })
    //   .then((response) => (timetable.items = response));

    columns[2].renderer = (root, column, rowData) => this.addListObjects(root);
    columns[0].renderer = (root, column, rowData) => this.getYourTaskList(root);
  }

  addListObjects(root) {
    const select = window.document.createElement('vaadin-select');
    const listBox = window.document.createElement('vaadin-list-box');

    this.rates.forEach(function(item) {
      const vaadinItem = window.document.createElement('vaadin-item');
      vaadinItem.textContent = item.description;
      listBox.appendChild(vaadinItem);
      vaadinItem.setAttribute('value', item.rateTypeId);
    });
    select.appendChild(listBox);
    root.appendChild(select);
  }

  getYourTaskList(root) {
    const select = window.document.createElement('vaadin-select');
    const listBox = window.document.createElement('vaadin-list-box');

    this.tasks.forEach(function(item) {
      const vaadinItem = window.document.createElement('vaadin-item');
      vaadinItem.textContent = item.projectId
                              + " "
                              + item.projectName
                              + "-"
                              + item.phaseName
                              + "-" + item.workEffortName;
      listBox.appendChild(vaadinItem);
      vaadinItem.setAttribute('value', item.workEffortId);
    });
    select.appendChild(listBox);
    root.appendChild(select);
  }

  handleSelectTimesheet(timesheetId) {
    this.router.navigateToRoute("timesheet-view", { id: timesheetId });
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
