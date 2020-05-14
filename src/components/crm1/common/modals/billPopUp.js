import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

import {inject} from 'aurelia-dependency-injection';

@inject(EventAggregator, HttpClient, Router)
export class BillPopUp {
  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http;
    this.router = router;

    ea.subscribe('currentBill', payload => {
      this.bill = payload;
      // eslint-disable-next-line no-console
      console.log(this.bill);
    });
  }
  get billAmount() {
    if (this.bill) {
      return this.bill.amount + '€';
    }
    return '';
  }
  get description() {
    if (this.bill === undefined || this.bill.itemDescription === null || this.bill.itemDescription.trim() === '') {
      return 'None';
    }
    return this.bill.itemDescription;
  }

}


