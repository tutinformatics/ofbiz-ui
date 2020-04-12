import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-dependency-injection';

@inject(HttpClient)
export class HttpClientCRM{
  constructor(http){
    this.http = http;

    this.baseUrl = 'http://localhost:7463/api/';

    this.http.configure(config => {
      config.withBaseUrl(this.baseUrl);
    });
  }
}
