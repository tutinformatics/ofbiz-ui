import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { OrderService } from '../../../service/order-service.js';
import {Store} from "aurelia-store";

@inject(EventAggregator, OrderService, Store)
export class OrderHeader {

  constructor(ea, orderService, store) {
    this.ea = ea;
    this.orderService = orderService;
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
    this.priceToggle = "equal";
    this.dateToggle = "greater";
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

  async applyFilter() {
    var body = [];
    if (this.filter.date !== "") {
      body.push({
        "fieldName": "createdStamp",
        "operation": this.dateToggle === "lower" ? "lessThan": "greaterThan",
        "value": Date.parse(this.filter.date)
      })
    }
    if (this.filter.price !== "") {
      body.push({
        "fieldName": "grandTotal",
        "operation": this.priceToggle === "lower" ? "lessThan": this.priceToggle === "greater" ? "greaterThan" : "equals",
        "value": this.filter.price
      })
    }
    if (this.filter.statusId !== "") {
      body.push({
        "fieldName": "statusId",
        "operation": "equals",
        "value": this.filter.statusId
      })
    }
    if (this.filter.salesChannelEnumId !== "") {
      body.push({
        "fieldName": "salesChannelEnumId",
        "operation": "equals",
        "value": this.filter.salesChannelEnumId
      })
    }
    var newData = [];
    var filteredData = await this.orderService.filter(body);
    filteredData["result"].forEach(function (opportunity) {
      newData.push(opportunity);
    });
    this.store.orders = newData;
  }
  toggleClickPrice() {
    if (this.priceToggle === "equal") {
      this.priceToggle = "greater";
    } else if (this.priceToggle === "greater") {
      this.priceToggle = "lower";
    } else {
      this.priceToggle = "equal";
    }
  }
  toggleClickDate() {
    if (this.dateToggle === "greater") {
      this.dateToggle = "lower";
    } else {
      this.dateToggle = "greater";
    }
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
