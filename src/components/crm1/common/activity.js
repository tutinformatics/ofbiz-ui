import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {TableEntry} from '../models/tableEntry';
import {getDate} from '../../../commons/util/dateConverter';
import {EntityQueryService} from '../services/entityQueryService';

@inject(EventAggregator, HttpClient, Router, EntityQueryService)
export class Activity {
  constructor(ea, http, router, entityQueryService) {
    this.ea = ea;
    this.http = http;
    this.router = router;
    this.entityQueryService = entityQueryService;

    this.activity = 'Notes';
    this.data = [];
    this.showModal = false;
    this.displayActivity = false;

    this.tableHeaders = [];
    this.tableData = [];
    this.headerDict = {};
    //Predefined table headers for each category
    this.headerDict.Notes =
      ['First name', 'Last name', 'Status', 'Email', 'Phone'];
    this.headerDict.Leads =
      ['Name', 'Status', 'Contact', 'ID'];
    this.headerDict.Opportunities =
      ['Opportunity name', 'Description', 'ID', 'Role Type'];
    this.headerDict.Returned =
      ['Return ID', 'From', 'To', 'Date', 'Status'];
    this.headerDict.Invoices =
      ['Invoice Id', 'From', 'To', 'Total'];
    this.headerDict.Orders =
      ['Order Id', 'Order Date', 'From', 'Total'];
    this.headerDict.Emails =
      ['From', 'To', 'Created Date', 'Send Date'];
    this.headerDict.Calls =
      ['From', 'To', 'Created Date', 'Send Date'];
    this.headerDict.Meetings =
      ['Company', 'With', 'Started', 'Ended'];
    this.headerDict.Proposals =
      ['ID', 'Created Date', 'Description', 'Status'];
    this.headerDict.Deals =
      ['ID', 'Company', 'Started', 'Ended'];
    this.headerDict.Claims =
      ['ID', 'Company', 'Started', 'Ended'];

    this.ea.subscribe('changeAction', payload => {
      if (payload !== 'refresh') {
        this.activity = payload.name;
      }
      this.tableData.length = 0;
      this.getData(this.activity).then(r =>{console.log('table fetch OK');});
    });

    this.ea.subscribe('changeModalState', payload => {
      this.showModal = payload;
    });

    this.ea.subscribe('displayActivity', boolean => {
      this.displayActivity = boolean;
    });

    ea.subscribe('contactChosen', payload => {
      this.chosenContact = payload;
      this.firstName = this.chosenContact.firstName;
      this.lastName = this.chosenContact.lastName;
      this.companyName = this.chosenContact.companyName;
      this.positionType = this.chosenContact.roleTypeId;
    });
  }

  closeActivity() {
    this.ea.publish('displayActivity', false);
  }
  async getData(entity) {
    this.data = this.tableData = [];
    this.tableHeaders = this.headerDict[entity];

    let response = await this.entityQueryService.getEntity(entity, this.chosenContact.partyId);
    this.data = response;
    for (let i = 0; i < response.length; i++) {
      let entry = new TableEntry(this.defineDataFor(entity, response[i]));
      this.tableData.push(entry);
    }
  }

  defineDataFor(entityName, responseEntry) {
    switch (entityName) {
    case 'Notes':
      return [
        responseEntry.partyId,
        responseEntry.firstName,
        responseEntry.lastName,
        responseEntry.emailAddress,
        responseEntry.phoneNumber
      ];
    case 'Leads':
      return [
        responseEntry.firstName,
        responseEntry.statusId,
        responseEntry.partyId,
        responseEntry.roleTypeId
      ];
    case 'Invoices':
      return [
        responseEntry.invoiceId,
        responseEntry.partyIdFrom,
        responseEntry.partyIdTrans,
        responseEntry.amount
      ];
    case 'Orders':
      return [
        responseEntry.orderId,
        getDate(responseEntry.orderDate),
        responseEntry.roleTypeId,
        responseEntry.grandTotal
      ];
    case 'Emails':
      return [
        responseEntry.partyIdFrom,
        responseEntry.partyIdTo,
        getDate(responseEntry.datetimeStarted),
        getDate(responseEntry.entryDate)
      ];
    case 'Calls':
      return [
        responseEntry.partyIdFrom,
        responseEntry.partyIdTo,
        getDate(responseEntry.datetimeStarted),
        getDate(responseEntry.entryDate)
      ];
    case 'Returned':
      return [
        responseEntry.returnHeaderTypeId,
        responseEntry.fromPartyId,
        responseEntry.toPartyId,
        getDate(responseEntry.entryDate),
        responseEntry.statusId
      ];
    case 'Opportunities':
      return [
        responseEntry.opportunityName,
        responseEntry.description,
        responseEntry.partyId,
        responseEntry.roleTypeId
      ];

    case 'Proposals':
      return [
        responseEntry.orderId,
        responseEntry.partyId,
        responseEntry.roleTypeId,
        responseEntry.grandTotal
      ];
    case 'Deals':
      return [
        responseEntry.orderId,
        responseEntry.partyId,
        responseEntry.roleTypeId,
        responseEntry.grandTotal

      ];
    case 'Claims':
      return [
        responseEntry.orderId,
        responseEntry.partyId,
        responseEntry.roleTypeId,
        responseEntry.grandTotal
      ];
    default: return undefined;
    }
  }

  test(entry) {
    console.log(this.data[this.tableData.indexOf(entry)]);
  }
}
