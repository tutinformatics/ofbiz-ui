import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { OrderService } from '../../../service/order-service.js';
import {Store} from "aurelia-store";
import {QueryBuilder} from './../query-builder/query-builder';

@inject(EventAggregator, OrderService, Store, QueryBuilder)
export class OrderHeader {

  constructor(ea, orderService, store, queryBuilder) {
    this.ea = ea;
    this.orderService = orderService;
    this.store = store;
    this.queryBuilder = queryBuilder;
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
  }

  attached() {
    this.queryBuilderLoad();
  }

  newOrder() {
    let order = {
      orderName: this.orderName,
      grandTotal: this.grandTotal,
      currencyUom: this.currencyUom,
      salesChannelEnumId: this.salesChannelEnumId,
      createdBy: this.state.userLoginId,
      orderTypeId: "SALES_ORDER",
      statusId: "ORDER_CREATED",
    };
    //billingAccountId: this.billingAccountId,
    this.orderService.createNewOrder(order);
    window.location.reload();
  };

  dataOperatorMapping = {
    '<=': 'lessThanEqualTo',
    '<': 'lessThan',
    '>': ' greaterThan',
    '>=': ' greaterThanEqualTo',
    '=': 'equals',
    '<>': 'notEqual'
  };

  queryBuilderLoad() {
    let queryBuilders = document.querySelectorAll('smart-query-builder');
    for (let queryBuilder of queryBuilders) {
      queryBuilder.addEventListener('click', function() {
        let list = this.getElementsByClassName('smart-conditions-menu');
        let elements = this.getElementsByClassName('smart-element smart-menu-item smart-unselectable');
        for (let item of list) {
          if (item.style.left === '38px') {
            for (let element of elements) {
              if (element.value === 'or') {
                element.style.display = 'none';
              } else {
                element.style.display = '';
              }
            }
          } else if (item.style.left === '11px') {
            for (let element of elements) {
              if (element.value === 'or') {
                element.style.display = '';
              } else {
                element.style.display = 'none';
              }
            }
          }
        }
      });
    }
  }

  getFilterFromComponent() {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    let queryBuilder = queryBuilders[0];
    let queryArray = queryBuilder.value;
    let filters = [];
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] === 'object') {
        let filterComponent = [];
        for (let j = 0; j < queryArray[i].length; j++) {
          const data = queryArray[i][j];
          if (typeof data === 'object') {
            var filter;
            if (data[0] === "createdStamp") {
              filter = {
                'fieldName': data[0],
                'operation': this.dataOperatorMapping[data[1]],
                'value': Date.parse(data[2])
              };
            } else {
              filter = {
                'fieldName': data[0],
                'operation': this.dataOperatorMapping[data[1]],
                'value': data[2]
              };
            }
            filterComponent.push(filter);
          }
        }
        filters.push(filterComponent);
      }
    }
    return filters[0];
  }

  async applyFilter() {
    var body = this.getFilterFromComponent();

    var newData = [];
    var filteredData = await this.orderService.filter(body);
    filteredData["result"].forEach(function (opportunity) {
      newData.push(opportunity);
    });
    this.store.orders = newData;
  }

  search() {
    var orders = [];
    var searchInput = this.searchId;
    this.store.ordersCopy.forEach(function (order) {
      if (order.orderId.toLowerCase().includes(searchInput.toLowerCase())) {
          orders.push(order);
      }
    });
    this.store.orders = orders;
  }
}
