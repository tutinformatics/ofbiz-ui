import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import {getDate} from '../../../commons/util/dateConverter';
import {Bill} from '../models/bill';
import {EntityQueryService} from '../services/entityQueryService';
import {computedFrom} from 'aurelia-framework';

@inject(EventAggregator, HttpClient, Router, EntityQueryService)
export class billsView {
  constructor(ea, http, router, entityQueryService) {
    this.ea = ea;
    this.http = http;
    this.router = router;
    this.entityQueryService = entityQueryService;
    this.bills = [];

    this.categories = [
      {
        'description': 'Description',
        'from': 'From',
        'to': 'To',
        'quantity': 'Quantity',
        'total': 'Total'
      }
    ];
    this.selectedDesc = [];
    this.selectedFr = ['From'];
    this.selectedTo = [];
    this.selectedQa = [];
    this.selectedTt = ['Total'];

    this.searchArgument = '';

    this.searchDescription = false;
    this.searchFrom = true;
    this.searchTo = true;
    this.searchType = true;
  }
  async attached() {
    await this.getAllBills();
  }

  getBillInformation(bill) {
    console.log(bill);
    this.ea.publish('currentBill', bill);
  }

  async getAllBills() {
    let response = await this.entityQueryService.getAllBills();

    for (let i = 0; i < response.length; i++) {
      let bill = new Bill(
        response[i].partyIdFrom,
        response[i].partyIdTrans,
        response[i].amount,
        response[i].quantity,
        response[i].invoiceId,
        response[i].itemDescription,
        response[i].invoiceTypeId,
        getDate(response[i].invoiceDate)
      );
      this.bills.push(bill);
    }
  }
  @computedFrom('searchArgument')
  get searchArg() {
    return this.searchArgument.trim().toUpperCase();
  }
  @computedFrom('searchArg')
  get filteredBills() {
    if (this.searchArg === '') {
      return this.bills;
    }
    console.log(this.searchArg);
    console.log(this.searchArg.split(' '));
    console.log(this.searchArg.split(' ').filter(arg => arg.startsWith('TOTAL')));

    let totalMethods = this.searchArg.split(' ').filter(arg => arg.startsWith('TOTAL')).map(arg => arg.substring(5, 6));
    let totalArguments = this.searchArg.split(' ').filter(arg => arg.startsWith('TOTAL')).map(arg => arg.substring(6));

    let length = totalMethods.length;

    console.log(totalMethods);
    console.log(totalArguments);

    return this.bills.filter(

    )
  }


  get isDesc() {
    if (this.selectedDesc.length > 0) {
      return (this.selectedDesc);
    }
    return false;
  }
  get isFrom() {
    if (this.selectedFr.length > 0) {
      return (this.selectedFr);
    }
    return false;
  }
  get isTo() {
    if (this.selectedTo.length > 0) {
      return (this.selectedTo);
    }
    return false;
  }
  get isQuality() {
    if (this.selectedQa.length > 0) {
      return (this.selectedQa);
    }
    return false;
  } get isTotal() {
    if (this.selectedTt.length > 0) {
      return (this.selectedTt);
    }
    return false;
  }
}

