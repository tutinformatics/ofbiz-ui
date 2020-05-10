import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-dependency-injection';
import {json} from "aurelia-fetch-client";
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {Router} from "aurelia-router";
import {TableEntry} from "../models/tableEntry";
import {getDate} from '../../../commons/util/dateConverter';

@inject(EventAggregator, HttpClientCRM, Router)
export class Activity {

  constructor(ea, http) {
    this.activity="Notes";
    this.showModal = false;
    this.http=http.http;
    this.ea = ea;
    this.data = [];
    this.tableHeaders = ["A", "B", "C", "D"];
    this.tableData = [];
    this.displayActivity = false;

    this.headerDict = {};
    //Predefined table headers for each category
    this.headerDict["Notes"] = ["First name", "Last name", "Status", "Email", "Phone"];
    this.headerDict["Leads"] = ["Name", "Status", "Contact", "ID"];
    this.headerDict["Opportunities"] = ["Opportunity name","Description","ID", "Role Type"];
    this.headerDict["Returned"] = ['Return ID', 'From', 'To', 'Date', 'Status'];
    this.headerDict["Invoices"] = ['Invoice Id', 'From', 'To', 'Total amount $']
    this.headerDict["Orders"] = ['Order Id', 'Order Date', 'From', 'Total amount']
    this.headerDict["Emails"] = ['From', 'To', 'Created Date', 'Send Date']
    this.headerDict["Calls"] = ['From', 'To', 'Created Date', 'Send Date']
    this.headerDict["Meetings"] = ['Compamy', 'With', 'Started', 'Ended']
    this.headerDict["Proposals"] = ['ID', 'Created Date', 'Description', 'Status']
    this.headerDict["Deals"] = ['ID', 'Company', 'Started', 'Ended']
    this.headerDict["Claims"] = ['ID', 'Company', 'Started', 'Ended']

    this.ea.subscribe("changeAction", payload => {
      this.activity = payload.name;
      this.tableData.length = 0;
      this.getData(this.activity).then(r =>{console.log("table fetch OK")});
    });

    this.ea.subscribe("changeModalState", payload => {
      this.showModal = payload;
    });

    this.ea.subscribe("displayActivity", boolean => {
      this.displayActivity = boolean;
    });

    ea.subscribe("contactChosen", payload => {
      this.chosenContact = payload;
      this.firstName = this.chosenContact.firstName;
      this.lastName = this.chosenContact.lastName;
      this.companyName = this.chosenContact.companyName;
      this.positionType = this.chosenContact.roleTypeId;
    });
  }



  closeActivity() {
    this.ea.publish("displayActivity", false);
  }
  async getData(activity) {
    // await this.login();
    this.data = this.tableData = [];
    this.tableHeaders = this.headerDict[activity];
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
        });
    case "Leads":
      return json({
        "inputFields":
          {
            "partyId": this.chosenContact.partyId,
            "roleTypeId": "LEAD"

          },
        "fieldList": [
          "firstName",
          "roleTypeId",
          "partyId",
          "statusId"
        ]
      });
    case "Invoices":
      return json({
        "inputFields": {
          "partyIdFrom": this.chosenContact.partyId,
        },
        "fieldList": [
          "partyIdFrom",
          "partyIdTrans",
          "amount",
          "quantity",
          "invoiceId",
          "itemDescription",
          "invoiceTypeId",
          "invoiceDate"
        ]
      });
    case "Orders":
      return json({
        "inputFields": {
          "partyId": this.chosenContact.partyId,
        },
        "fieldList": [
          "orderId",
          "orderDate",
          "entryDate",
          "partyId",
          "webSiteId",
          "roleTypeId",
          "grandTotal",
          "statusId"
        ]
    });
    case "Emails":
      return json({
        "inputFields": {
          "partyId": this.chosenContact.partyId,
          "communicationEventTypeId": "EMAIL_COMMUNICATION"
        },
        "fieldList": [
          "partyIdFrom",
          "partyIdTo",
          "entryDate",
          "datetimeStarted"
        ]
      });
    case "Calls":
      return json({
        "inputFields": {
          "partyId": this.chosenContact.partyId,
          "communicationEventTypeId": "PHONE_COMMUNICATION"
        },
        "fieldList": [
          "partyIdFrom",
          "partyIdTo",
          "entryDate"
        ]
      });

      case "Meetings":
        return json({
          "inputFields": {
            "partyId": this.chosenContact.partyId,
            "communicationEventTypeId": "FACE_TO_FACE_COMMUNICATION"
          },
          "fieldList": [
            "partyIdFrom",
            "partyIdTo",
            "datetimeStarted",
            "datetimeEnded"
          ]
        });
    case "Opportunities":
      return json({
        "inputFields": {
          "partyId": this.chosenContact.partyId,
        },
        "fieldList": [
          "opportunityName",
          "description",
          "partyId",
          "roleTypeId"
        ]
      });

    case "Returned":
      return json({
        "inputFields": {
          "toPartyId": this.chosenContact.partyId,
        },
        "fieldList": [
          "returnHeaderTypeId",
          "fromPartyId",
          "toPartyId",
          "entryDate",
          "statusId"
        ]
      });
    case "Deals":
      return json({
        "inputFields": {

        },
        "fieldList": [

        ]
      });
    case "Proposals":
      return json({
        "inputFields": {

        },
        "fieldList": [

        ]
      });
    case "Claims":
      return json({
        "inputFields": {

        },
        "fieldList": [

        ]
      });
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
        return "SalesOpportunityAndRole";
      case "Invoices":
        return "InvoiceExport";
      case "Orders":
        return "OrderHeaderItemAndInvRoles";
      case "Emails":
        return "CommunicationEventAndRole";
      case "Calls":
        return "CommunicationEventAndRole";
      case "Meetings":
        return "CommunicationEventAndRole";
      case "Returned":
        return "ReturnHeader";
      case "Claims":
        return "SalesOpportunityAndRole";
      case "Proposals":
        return "SalesOpportunityAndRole";
      case "Deals":
        return "SalesOpportunityAndRole";
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
        ];
    case "Leads":
      return [
        responseEntry.firstName,
        responseEntry.statusId,
        responseEntry.partyId,
        responseEntry.roleTypeId
      ];
    case "Invoices":
      return [
        responseEntry.invoiceId,
        responseEntry.partyIdFrom,
        responseEntry.partyIdTrans,
        responseEntry.amount
      ];
    case "Orders":
      let entryDate = getDate(responseEntry.orderDate);
      return [
        responseEntry.orderId,
        entryDate,
        responseEntry.roleTypeId,
        responseEntry.grandTotal
      ];
    case "Emails":
      let datetimeStarted = getDate(responseEntry.datetimeStarted);
      let entry = getDate(responseEntry.entryDate);
      return [
        responseEntry.partyIdFrom,
        responseEntry.partyIdTo,
        datetimeStarted,
        entry
      ];
    case "Calls":
      let datetimeStarted1 = getDate(responseEntry.datetimeStarted);
      let entry1 = getDate(responseEntry.entryDate);
      return [
        responseEntry.partyIdFrom,
        responseEntry.partyIdTo,
        datetimeStarted1,
        entry1
    ];
    case "Returned":
      let entryD = getDate(responseEntry.entryDate);
      return [
        responseEntry.returnHeaderTypeId,
        responseEntry.fromPartyId,
        responseEntry.toPartyId,
        entryD,
        responseEntry.statusId
      ];
    case "Opportunities":
      return [
        responseEntry.opportunityName,
        responseEntry.description,
        responseEntry.partyId,
        responseEntry.roleTypeId
      ]

    case "Proposals":
      return [

      ]
    case "Deals":
      return [


      ]
    case "Claims":
      return [

      ]
    default: return undefined;
    }
  }

  test(entry) {
    console.log(this.tableData.isUndefined)
    // console.log(this.data[this.tableData.indexOf(entry)].emailAddress);
  }
}
