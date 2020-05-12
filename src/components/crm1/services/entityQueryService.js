import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class EntityQueryService {
  baseUrl = '/api/generic/v1/';

  constructor(httpClient) {
    this.http = httpClient;
    this.baseUrl = 'https://35.228.134.15:8443/api/generic/v1/';
  }

  getAllBills() {
    return this.http.fetch(`https://35.228.134.15:8443/api/generic/v1/entityquery/InvoiceExport`, {
      method: 'post',
      body: json({
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
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });
  }

  getAllContacts(){
    return this.http.fetch(`${this.baseUrl}entityquery/PartyExport`, {
      method: 'post',
      body: json({
        "inputFields":
          {
            "roleTypeId" : "CONTACT"
          },
        "fieldList": [
          "lastName",
          "firstName",
          "emailAddress",
          "telContactNumber",
          "companyName",
          "roleTypeId",
          "address1",
          "city",
          "postalCode",
          "partyId"
        ]
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });
  }

  getAllParties() {
    return this.http.fetch(`${this.baseUrl}entityquery/PartyRoleAndPartyDetail`, {
      method: 'post',
      body: json({
        "inputFields":
          {
            "roleTypeId": "ACCOUNT"
          },
        "fieldList": [
          "partyId",
          "roleTypeId",
          "groupName"
        ]
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });
  }

  getAllOrders() {
    return this.http.fetch(`${this.baseUrl}entityquery/OrderHeaderItemAndInvRoles`, {
      method: 'post',
      body: json({
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
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });

  }

  getAllParties() {
    return  this.http.fetch(`${this.baseUrl}entityquery/PartyRoleAndPartyDetail`, {
      method: 'post',
      body: json({
        "inputFields":
          {
            "roleTypeId": "ACCOUNT"
          },
        "fieldList": [
          "partyId",
          "roleTypeId",
          "groupName"
        ]
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });
  }

  getActivity(activity, targetPartyId) {
    return this.http.fetch('https://35.228.134.15:8443/api/generic/v1/entityquery/' + this.resolveEntity(activity), {
      method: 'post',
      body: this.resolveBody(activity, targetPartyId)
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching!');
      });
  }

  resolveBody(entity, targetPartyId) {
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
              "partyId": targetPartyId,
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
            "partyIdFrom": targetPartyId,
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
            "partyId": targetPartyId,
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
            "partyId": targetPartyId,
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
            "partyId": targetPartyId,
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
            "partyId": targetPartyId,
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
            "partyId": targetPartyId,
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
            "toPartyId": targetPartyId,
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
}

