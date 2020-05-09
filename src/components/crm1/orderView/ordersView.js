import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';

import {inject} from 'aurelia-dependency-injection';
import {Order} from '../models/order';
import {Router} from 'aurelia-router';
import {getDate} from '../../../commons/util/dateConverter';

@inject(EventAggregator, HttpClientCRM, Router)
export class ordersView {
  // phone = [ 'Phone'];
  // mail = [ 'Email'];
  // pageSize = 10;
  //
  // selectedPhone = [];
  // selectedEmail = [];
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
  // get isPhone() {
  //   if(this.selectedPhone.length>0){
  //     return (this.selectedPhone);
  //   }
  //   return false;
  // }
  // get isEmail() {
  //   if(this.selectedEmail.length>0){
  //     return (this.selectedEmail);
  //   }
  //   return false;
  // }
}

