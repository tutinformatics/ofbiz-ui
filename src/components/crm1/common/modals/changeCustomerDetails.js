import {inject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {Router} from "aurelia-router";
import {HttpClientCRM} from '../../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';
import {readErrorMsg} from '../../utils/alertHandling';
import * as toastr from 'toastr';
import {alertConfig} from '../../config/alertConf';

@inject(EventAggregator, HttpClientCRM, Router)
export class ChangeCustomerDetails {
  constructor(ea, http, router) {
    this.http = http.http;
    this.ea = ea;
    ea.subscribe("contactChosen", payload => {
      this.chosenContact = payload
      this.firstName = this.chosenContact.firstName;
      this.lastName = this.chosenContact.lastName;
      this.companyName = this.chosenContact.companyName;
      this.positionType = this.chosenContact.position;
      this.partyId = this.chosenContact.partyId
    });
  }

  async updatePerson(firstName, lastName) {
    let response = await this.http.fetch('/services/updatePerson', {
      method: 'post',
      body: json({
        "firstName": firstName,
        "lastName": lastName,
        "partyId": this.partyId,
        "login.username": "admin",
        "login.password": "ofbiz"
      })
    })
      .then(response => response.json())

    if (response.responseMessage === "error") {
      let errMsg = readErrorMsg(response);
      toastr.error(errMsg, "", alertConfig);
      return null;
    }
  }
}

