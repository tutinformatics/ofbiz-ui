import { inject } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { observable } from "aurelia-binding";
import { HttpInterceptor } from "./httpInterceptor";

@inject(HttpClient, Store, HttpInterceptor)
export class HttpService {

  @observable state;
  error;

  constructor(httpClient, store, httpInterceptor) {
    this.httpClient = httpClient;
    this.store = store;
    this.httpInterceptor = httpInterceptor;
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.state = state;
      }
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  stateChanged(newState) {
    this.httpClient.configure(config => {
        config
          .withBaseUrl('api/')
          .withDefaults({
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${newState.jwtToken}`
              }
            }
          )
          .withInterceptor(this.httpInterceptor);
      }
    );
  }

}
