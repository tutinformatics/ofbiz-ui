import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import {getDate} from '../../../commons/util/dateConverter';
import {Bill} from '../models/bill';
import {EntityQueryService} from '../services/entityQueryService';

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
  }
  async attached() {
    await this.getAllBills();
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

  get searchArg() {
    return this.searchArgument.trim().toUpperCase();
  }

  get filteredBills() {
    if (this.searchArg === '') {
      return this.bills;
    }
    console.log(this.bills);
    return this.bills.filter(
      bill => bill.itemDescription != null &&
        bill.itemDescription.toUpperCase().split(' ').length > 1
    );
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

