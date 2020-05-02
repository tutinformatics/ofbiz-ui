import { inject } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { observable } from "aurelia-binding";
import { HttpInterceptor } from "./httpInterceptor";

@inject(HttpClient, Store, HttpInterceptor)
export class HttpService {

  @observable token;

  constructor(httpClient, store, httpInterceptor) {
    this.httpClient = httpClient;
    this.store = store;
    this.httpInterceptor = httpInterceptor;
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.token = state.jwtToken;
      }
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  tokenChanged(newToken) {
    this.httpClient.configure(config => {
        config
          .withDefaults({
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${newToken}`
              }
            }
          )
          .withInterceptor(this.httpInterceptor);
      }
    );
  }

}
