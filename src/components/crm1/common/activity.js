import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-dependency-injection';
import {json} from "aurelia-fetch-client";
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {Router} from "aurelia-router";
import {TableEntry} from "../models/tableEntry";

@inject(EventAggregator, HttpClientCRM, Router)
export class Activity {

  constructor(ea, http) {
    this.activity="Notes";
    this.showModal = false
    this.http=http.http;
    this.ea = ea;
    this.data = [];
    this.tableHeaders = ["A", "B", "C", "D"]
    this.notesHeaders = ["First name", "Last name", "status", "email", "phone"]
    this.tableData = [];
    this.displayActivity = false
    //Predefined table headers for each category

    this.ea.subscribe("changeAction", payload => {
      this.activity = payload.name;
      this.tableData.length = 0;
      this.getData(this.activity).then(r =>{console.log("table fetch OK")});
    })

    this.ea.subscribe("changeModalState", payload => {
      this.showModal = payload;
    })

    this.ea.subscribe("displayActivity", boolean => {
      this.displayActivity = boolean;
    })
  }



  closeActivity() {
    this.ea.publish("displayActivity", false);
  }
  async getData(activity) {
    // await this.login();
    if (activity === "Notes") {
      this.tableHeaders = this.notesHeaders;
    }
      else if(activity === "Leads"){
      this.tableHeaders = this.notesHeaders;

    } else {
      console.log("else");
      this.data = [];
      this.tableData = []
    }
    await this.fetch(activity);
  }

  async fetch(activity) {
    let response = await this.http.fetch('/entityquery/' + this.resolveEntity(activity), {
      method: 'post',
      body: this.resolveBody(activity)
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching!');
      });
    console.log(response.data)
    for (let i = 0; i < response.length; i++) {
      //Hard copied in case we make any other requests
      this.data.push(Object.create(response[i]));

      let entry = new TableEntry(this.defineDataFor(activity, response[i]));
      this.tableData.push(entry);
    }
  }

  resolveBody(entity) {
    switch (entity) {
      case "Notes":
        return json({
          "fieldList": [
            "lastName",
            "firstName",
            "emailAddress",
            "phoneNumber",
            "companyName",
            "roleTypeId",
            "address",
            "postalCode",
            "partyId"
          ]
        })
    case "Leads":
      return json({
        "inputFields":
          {
            "roleTypeId": "LEAD"
          },
        "fieldList": [
          "firstName",
          "roleTypeId",
          "partyId",
          "statusId"
        ]
      })
      default:
        return "none";
    }
  }

  resolveEntity(entityName) {
    switch (entityName) {
      case "Notes":
        return "PartyExport";
    case "Leads":
      return "PartyRoleAndContactMechDetail";
    case "Opportunities":
      return "SalesOpportunity";

      default:
        return "PartyExport";
    }
  }

  defineDataFor(entityName, responseEntry) {
    switch (entityName) {
      case "Notes":
        return [
          responseEntry.partyId,
          responseEntry.firstName,
          responseEntry.lastName,
          responseEntry.emailAddress,
          responseEntry.phoneNumber
        ]
    case "Leads":
      return [
        responseEntry.firstName,
        responseEntry.statusId,
        responseEntry.partyId,
        responseEntry.roleTypeId

      ]
      default: return undefined;
    }
  }

  test(entry) {
    console.log(this.data[this.tableData.indexOf(entry)].emailAddress);
  }





}
