import { inject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { activationStrategy } from "aurelia-router";
import { TimesheetService } from "../services/timesheet-service";
import { Store } from "aurelia-store";
import { getStatusBadge, convertStatus } from "../../../commons/util/status-utils";

@inject(Router, TimesheetService, Store)
export class MyTaskTime {

  constructor(router, timesheetService, store) {
    this.router = router;
    this.timesheetService = timesheetService;
    this.store = store;
    this.tasks = {};
    this.rates = {};
    this.subscription = this.store.state.subscribe(
      (state) => (this.state = state)
    );
  }

  activate(params, routeConfig) {
    // this.params = params;
    // routeConfig.navModel.setTitle(`Timesheet ID: ${params.id}`);

    this.timesheetService
      .getRateTypes()
      .then((response) => (this.rates = response));

    this.timesheetService
      .getMyTime({ partyId: this.state.userLoginId })
      .then((response) => (this.tasks = response));
  }

  attached() {
    const select = document.querySelector("vaadin-select");

    //TODO: make this work, currently activating everytime you open the vaadin-select
    //select.renderer = (root) => this.getYourTaskList(root);
  }


  getYourTaskList(root) {
    const listBox = window.document.createElement('vaadin-list-box');

    this.tasks.forEach(function(item) {

      const vaadinItem = window.document.createElement('vaadin-item');
      vaadinItem.textContent = item.projectId
                              + " "
                              + item.projectName
                              + "-"
                              + item.phaseName
                              + "-" + item.workEffortName;
      console.log(vaadinItem.textContent);
      listBox.appendChild(vaadinItem);
      vaadinItem.setAttribute('value', item.workEffortId);
    });
    root.appendChild(listBox);
  }

}
