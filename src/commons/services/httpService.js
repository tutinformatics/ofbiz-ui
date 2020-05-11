import { inject } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import { HttpInterceptor } from "./httpInterceptor";

@inject(HttpClient, HttpInterceptor)
export class HttpService {

  constructor(httpClient, httpInterceptor) {
    this.httpClient = httpClient;
    this.httpInterceptor = httpInterceptor;
    this.httpClient.configure(config => {
        config
          .withDefaults({
              headers: {
                'Accept': 'application/json',
              }
            }
          )
          .withInterceptor(this.httpInterceptor);
      }
    );
  }

}
