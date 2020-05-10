import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';

import {inject} from 'aurelia-dependency-injection';
import {Order} from '../models/order';
import {Router} from 'aurelia-router';
import {getDate} from '../../../commons/util/dateConverter';

@inject(EventAggregator, HttpClientCRM, Router)
export class ordersView {
  categories = [
    {
      "orderDate": 'Order Date',
      "shipment" : 'Shipment Start',
      "website" : "Website",
      "salesperson" : "Salesperson",
      "total" : "Total",
      "status" : "Status",
    }
  ]

  selectedOrder = [];
  selectedShip = [];
  selectedWeb = [];
  selectedSale = [];
  selectedTt = [];
  selectedStatus = [];

  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    this.router = router;
    this.orders = [];

  }

  async attached() {
    await this.getAllOrders();
  }
  async getAllOrders() {
    console.log('here');
    // await this.login();
    let response = await this.http.fetch('/entityquery/OrderHeaderItemAndInvRoles', {
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

    for (let i = 0; i < response.length; i++) {
      let orderDate = getDate(response[i].orderDate);
      let entryDate = getDate(response[i].entryDate);
      let order = new Order(
        response[i].orderId,
        orderDate,
        entryDate,
        response[i].partyId,
        response[i].webSiteId,
        response[i].roleTypeId,
        response[i].grandTotal,
        response[i].statusId
      );

      this.orders.push(order);
    }
  }
  selectedOrder = [];
  selectedShip = [];
  selectedWeb = [];
  selectedSale = [];
  selectedTt = [];
  selectedStatus = [];
  get isOrder() {
    if(this.selectedOrder.length>0){
      return (this.selectedOrder);
    }
    return false;
  }
  get isShip() {
    if(this.selectedShip.length>0){
      return (this.selectedShip);
    }
    return false;
  }
  get isWeb() {
    if(this.selectedWeb.length>0){
      return (this.selectedWeb);
    }
    return false;
  }
  get isSale() {
    if(this.selectedSale.length>0){
      return (this.selectedSale);
    }
    return false;
  }get isTotal() {
    if(this.selectedTt.length>0){
      return (this.selectedTt);
    }
    return false;
  }
  get isStatus() {
    if(this.selectedStatus.length>0){
      return (this.selectedStatus);
    }
    return false;
  }

}
