import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import {getDate} from '../../../commons/util/dateConverter';
import {Bill} from '../models/bill';

@inject(EventAggregator, HttpClientCRM, Router)
export class billsView {


  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    this.router = router;
    this.bills = [];

  }

  async attached() {
    await this.getAllBills();

  }



  async getAllBills() {
    let response = await this.http.fetch('/entityquery/InvoiceExport', {
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


    for (let i = 0; i < response.length; i++) {
      let invoicedate = getDate(response[i].invoiceDate);
        let bill = new Bill(
        response[i].partyIdFrom,
          invoicedate,
        response[i].partyIdTrans,
        response[i].amount,
        response[i].quantity,
        response[i].invoiceId,
        response[i].itemDescription,
        response[i].invoiceTypeId
      );

      this.bills.push(bill);
    }
  }


}

