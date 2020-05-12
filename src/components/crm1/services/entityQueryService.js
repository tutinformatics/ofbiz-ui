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
}

