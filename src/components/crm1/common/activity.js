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
    this.showModal = false;
    this.http=http.http;
    this.ea = ea;
    this.data = [];
    this.tableHeaders = ["A", "B", "C", "D"];
    this.notesHeaders = ["First name", "Last name", "status", "email", "phone"]
    this.tableData = [];
    this.displayActivity = false;
    //Predefined table headers for each category

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
    if (activity === "Notes") {
      this.tableHeaders = this.notesHeaders;
      this.data = [];
      this.tableData = []
    }
    else if(activity === "Leads"){
      this.tableHeaders = ["Name", "Status", "Contact", "ID"];
      this.data = [];
      this.tableData = []
    }
    else if(activity === "Opportunities") {
      this.tableHeaders = ["Opportunity name","Description","ID", "Role Type"];
      this.data = [];
      this.tableData = []
    }
    else if(activity === "Returned") {
      this.tableHeaders = ['Return ID', 'From', 'To', 'Date', 'Status'];
      this.data = [];
      this.tableData = []
    } else if (activity === "Invoices") {
      this.tableHeaders = ['Invoice Id', 'From', 'To', 'Total amount $']
      this.data = [];
      this.tableData = []
    } else if (activity === "Orders") {
      this.tableHeaders = ['Order Id', 'Order Date', 'From', 'Total amount']
      this.data = [];
      this.tableData = []
    } else if (activity === "Emails") {
      this.tableHeaders = ['From', 'To', 'Created Date', 'Send Date']
      this.data = [];
      this.tableData = []
    } else if (activity === "Calls") {
      this.tableHeaders = ['From', 'To', 'Created Date', 'Send Date']
      this.data = [];
      this.tableData = []
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
    case "Returned":
      return "ReturnHeader";
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
      return [
        responseEntry.orderId,
        responseEntry.orderDate,
        responseEntry.roleTypeId,
        responseEntry.grandTotal
      ];
    case "Emails":
      return [
        responseEntry.partyIdFrom,
        responseEntry.partyIdTo,
        responseEntry.datetimeStarted,
        responseEntry.entryDate
      ];
    case "Calls":
      return [
        responseEntry.partyIdFrom,
        responseEntry.partyIdTo,
        responseEntry.datetimeStarted,
        responseEntry.entryDate
    ];
    case "Returned":
      return [
        responseEntry.returnHeaderTypeId,
        responseEntry.fromPartyId,
        responseEntry.toPartyId,
        responseEntry.entryDate,
        responseEntry.statusId


      ];
    case "Opportunities":
      return [
        responseEntry.opportunityName,
        responseEntry.description,
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
