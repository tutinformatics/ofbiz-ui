import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import {getDate} from '../../../commons/util/dateConverter';
import {Bill} from '../models/bill';

@inject(EventAggregator, HttpClientCRM, Router)
export class billsView {

  categories = [
    {
      "description": 'Description',
      "from" : 'From',
      "to" : "To",
      "quantity" : "Quantity",
      "total" : "Total"
    }
  ]

  selectedDesc = [];
  selectedFr = [];
  selectedTo = [];
  selectedQa = [];
  selectedTt = [];


  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    this.router = router;
    this.bills = [];
    this.searchArgument = ""
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

  get isDesc() {
    if(this.selectedDesc.length>0){
      return (this.selectedDesc);
    }
    return false;
  }
  get isFrom() {
    if(this.selectedFr.length>0){
      return (this.selectedFr);
    }
    return false;
  }
  get isTo() {
    if(this.selectedTo.length>0){
      return (this.selectedTo);
    }
    return false;
  }
  get isQuality() {
    if(this.selectedQa.length>0){
      return (this.selectedQa);
    }
    return false;
  }get isTotal() {
    if(this.selectedTt.length>0){
      return (this.selectedTt);
    }
    return false;
  }

  get searchArg() {
    return this.searchArgument.trim().toUpperCase();
  }

  get filteredBills() {
    if (this.searchArg === "") {
      return this.bills;
    }
    console.log(this.bills)
    return this.bills.filter(
      bill => bill.itemDescription != null &&
        bill.itemDescription.toUpperCase().split(" ").length > 1
    )
  }
}

