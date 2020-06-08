import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Store } from "aurelia-store";

@inject(HttpClient, Store)
export class OrderService {
  baseUrl = 'api/generic/v1/';

  constructor(httpClient, store) {
    this.client = httpClient;
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );

  }
  unbind() {
    this.subscription.unsubscribe();
  }

  getOrders() {
    return this.client
      .fetch(`${this.baseUrl}entities/OrderHeader?createdBy=` + this.state.userLoginId)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }
  post() {
    return this.client
      .fetch(`localhost:8443/api/auth/v1/token`, {
        method: 'post',
        body: json({
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyTG9naW5JZCI6Imluc2VydF91c2VybmFtZV9oZXJlIiwiaXNzIjoiQXBhY2hlT0ZCaXoiLCJleHAiOjE1ODc4NDEzMzgsImlhdCI6MTU4NzgzOTUzOH0.Gw3tafcMOaSq-7jj2Tgc_RnvMlc6hGMmDKU9xdC6wo00Lud_BBFVZEaACXn2gI4rrIZEzZD85yUDrKW-69CKIA"
        })
      })
  }
  get(type) {
    return this.client
      .fetch(`${this.baseUrl}entities/` + type)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }
  deleteOrder(id) {
    return this.client
      .fetch(
        `${this.baseUrl}entities/OrderHeader/?orderId=` + id,
        {
          method: "DELETE"
        }
      );
  }
  async filter(body) {
    body.push({
      "fieldName": "createdBy",
      "operation": "equals",
      "value": this.state.userLoginId
    });
    return this.client
      .fetch(`${this.baseUrl}services/performFilteredSearch`, {
        method: 'POST',
        body: json({
          "filterParameters": body,
          "entityName": "OrderHeader"
        })
      }).then(response => response.json());
  }
  editOrder(order) {
    this.client
      .fetch(`${this.baseUrl}entities/OrderHeader`, {
        method: 'PUT',
        body: json(order)
      })
  }
  createNewOrder(order) {
    order.createdBy = this.state.userLoginId;
    this.client
      .fetch(`${this.baseUrl}entities/OrderHeader`, {
        method: 'POST',
        body: json(order)
      })
      .catch(reason => {
        console.error(reason);
      });
  }

}

