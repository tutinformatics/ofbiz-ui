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
      .fetch(`${this.baseUrl}entities/salesOrder`)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
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
        `${this.baseUrl}entities/salesOrder?orderId=` + id,
        {
          method: "DELETE"
        }
      );

  }
  editOrder(order) {
    this.client
      .fetch(`${this.baseUrl}entities/salesOrder`, {
        method: 'PUT',
        body: json(order)
      })
  }
  createNewOrder(order) {
    this.client
      .fetch(`${this.baseUrl}entities/salesOrder`, {
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

