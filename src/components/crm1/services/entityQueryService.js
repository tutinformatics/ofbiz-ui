import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class EntityQueryService {
  constructor(httpClient) {
    this.http = httpClient;
    //this.baseUrl = 'https://35.228.134.15:8443/api/generic/v1/entityquery/';
    this.baseUrl = '/api/generic/v1/entityquery/';
  }

  getEntity(entity, targetPartyId) {
    return this.http.fetch(this.baseUrl + this.resolveEntity(entity), {
      method: 'post',
      body: this.resolveBody(entity, targetPartyId)
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching!');
      });
  }

  resolveEntity(entityName) {
    switch (entityName) {
    case 'Notes':
      return 'PartyNote';
    case 'Leads':
      return 'PartyRoleAndContactMechDetail';
    case 'Opportunities':
      return 'SalesOpportunityAndRole';
    case 'Invoices':
      return 'InvoiceExport';
    case 'Orders':
      return 'OrderHeaderItemAndInvRoles';
    case 'Emails':
      return 'CommunicationEventAndRole';
    case 'Calls':
      return 'CommunicationEventAndRole';
    case 'Meetings':
      return 'CommunicationEventAndRole';
    case 'Returned':
      return 'ReturnHeader';
    case 'Claims':
      return 'SalesOpportunityAndRole';
    case 'Proposals':
      return 'SalesOpportunityAndRole';
    case 'Deals':
      return 'SalesOpportunityAndRole';
    case 'Bills':
      return 'InvoiceExport';
    case 'Contacts':
      return 'PartyExport';
    case 'Parties':
      return 'PartyRoleAndPartyDetail';
    case 'Classification':
      return 'PartyClassification';
    default:
      return undefined;
    }
  }

  resolveBody(entity, targetPartyId) {
    switch (entity) {
    case 'Notes':
      return json({
        'inputFields': {
          'partyId': targetPartyId
        },
        'fieldList': [
        ]
      });
    case 'Leads':
      return json({
        'inputFields':
            {
              'partyId': targetPartyId,
              'roleTypeId': 'LEAD'
            },
        'fieldList': [
        ]
      });
    case 'Invoices':
      return json({
        'inputFields': {
          'partyIdFrom': targetPartyId
        },
        'fieldList': []
      });
    case 'Orders':
      return json({
        'inputFields': {
          'partyId': targetPartyId
        },
        'fieldList': [
        ]
      });
    case 'Emails':
      return json({
        'inputFields': {
          'partyId': targetPartyId,
          'communicationEventTypeId': 'EMAIL_COMMUNICATION'
        },
        'fieldList': [
        ]
      });
    case 'Calls':
      return json({
        'inputFields': {
          'partyId': targetPartyId,
          'communicationEventTypeId': 'PHONE_COMMUNICATION'
        },
        'fieldList': [
        ]
      });

    case 'Meetings':
      return json({
        'inputFields': {
          'partyId': targetPartyId,
          'communicationEventTypeId': 'FACE_TO_FACE_COMMUNICATION'
        },
        'fieldList': [
        ]
      });
    case 'Opportunities':
      return json({
        'inputFields': {
          'partyId': targetPartyId
        },
        'fieldList': [
        ]
      });

    case 'Returned':
      return json({
        'inputFields': {
          'toPartyId': targetPartyId
        },
        'fieldList': [
        ]
      });
    case 'Deals':
      return json({
        'inputFields': {
        },
        'fieldList': [
        ]
      });
    case 'Proposals':
      return json({
        'inputFields': {
        },
        'fieldList': [
        ]
      });
    case 'Claims':
      return json({
        'inputFields': {
        },
        'fieldList': [
        ]
      });
    case 'Bills':
      return json({
        'fieldList': [
        ]
      }
      );
    case 'Contacts':
      return json({
        'inputFields':
            {
              'roleTypeId': 'CONTACT'
            },
        'fieldList': [
        ]
      });
    case 'Parties' :
      return json({
        'inputFields':
            {
              'roleTypeId': 'ACCOUNT'
            },
        'fieldList': [
        ]
      });
    case 'Classification' :
      return json({
        'fieldList': [
        ]
      });
    default:
      return 'none';
    }
  }

  getAllBills() {
    return this.getEntity('Bills');
  }

  getAllContacts() {
    return this.getEntity('Contacts');
  }

  getAllParties() {
    return this.getEntity('Parties');
  }

  getAllOrders() {
    return this.getEntity('Orders');
  }
  getClassification() {
    return this.getEntity('Classification')
  }
}

