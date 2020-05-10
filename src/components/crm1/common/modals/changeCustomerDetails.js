
import {inject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {Router} from "aurelia-router";

@inject(EventAggregator,  Router)
export class ChangeCustomerDetails {
  constructor(ea, http, router) {
    this.ea = ea;



    ea.subscribe("contactChosen", payload => {
      this.chosenContact = payload
      this.firstName = this.chosenContact.firstName;
      this.lastName = this.chosenContact.lastName;
      this.companyName = this.chosenContact.companyName;
      this.positionType = this.chosenContact.roleTypeId;
    });

  }
}

