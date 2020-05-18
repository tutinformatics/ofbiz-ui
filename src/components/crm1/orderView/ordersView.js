import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {Order} from '../models/order';
import {Router} from 'aurelia-router';
import {getDate} from '../../../commons/util/dateConverter';
import {EntityQueryService} from '../services/entityQueryService';
import {computedFrom} from 'aurelia-framework';

@inject(EventAggregator, HttpClient, Router, EntityQueryService)
export class ordersView {
  constructor(ea, http, router, entityQueryService) {
    this.ea = ea;
    this.http = http;
    this.router = router;
    this.entityQueryService = entityQueryService;

    this.orders = [];
    this.categories = [
      {
        'orderDate': 'Order Date',
        'shipment': 'Shipment Start',
        'website': 'Website',
        'salesperson': 'Type',
        'status': 'Status'
      }
    ];
    this.selectedOrder = [];
    this.selectedShip = [];
    this.selectedWeb = [];
    this.selectedSale = [];
    this.selectedTt = [];
    this.selectedStatus = [];
    this.simpleView = true;
    this.view = "Card View";
    this.searchArgument = '';
    this.searchParty = true;
    this.searchWebsite = true;
  }

  async attached() {
    await this.getAllOrders();
  }
  async getAllOrders() {
    let response = await this.entityQueryService.getAllOrders();
    for (let i = 0; i < response.length; i++) {
      let order = new Order(
        response[i].orderId,
        getDate(response[i].orderDate),
        getDate(response[i].entryDate),
        response[i].partyId,
        response[i].webSiteId,
        response[i].roleTypeId,
        response[i].grandTotal,
        response[i].statusId
      );
      this.orders.push(order);
    }
  }

  @computedFrom('searchArgument')
  get searchArg() {
    return this.searchArgument.trim().toUpperCase();
  }

  @computedFrom('searchArgument', 'searchParty', 'searchWebsite')
  get filteredOrders() {
    if (this.searchArg === '' || (!this.searchParty && !this.searchWebsite)) {
      return this.orders;
    }
    return this.orders.filter(
      order =>
        (this.searchParty && order.partyId && order.partyId.toUpperCase().startsWith(this.searchArg )) ||
        (this.searchWebsite && order.webSiteId && order.webSiteId.toUpperCase().startsWith(this.searchArg))
    );
  }

  get isOrder() {
    if (this.selectedOrder.length > 0) {
      return (this.selectedOrder);
    }
    return false;
  }
  get isShip() {
    if (this.selectedShip.length > 0) {
      return (this.selectedShip);
    }
    return false;
  }
  get isWeb() {
    if (this.selectedWeb.length > 0) {
      return (this.selectedWeb);
    }
    return false;
  }
  get isSale() {
    if (this.selectedSale.length > 0) {
      return (this.selectedSale);
    }
    return false;
  } get isTotal() {
    if (this.selectedTt.length > 0) {
      return (this.selectedTt);
    }
    return false;
  }
  get isStatus() {
    if (this.selectedStatus.length > 0) {
      return (this.selectedStatus);
    }
    return false;
  }
  cardView(){
    this.view = "Card view"
    this.simpleView = true;
  }
  tableView(){
    this.view = "Table View"
    this.simpleView = false;
  }

}

