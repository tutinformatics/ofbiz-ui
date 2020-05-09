import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Store } from "aurelia-store";

@inject(HttpClient, Store)
export class OrderService {
  baseUrl = '/api/generic/v1/';

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

  createNewOrder(order) {
    this.client
      .fetch(`${this.baseUrl}entities/OrderHeader`, {
        method: 'post',
        body: json(order)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(reason => {
        console.error(reason);
      });
  }

}

