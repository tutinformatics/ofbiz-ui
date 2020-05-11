import {HttpClient} from 'aurelia-fetch-client';

import {inject} from 'aurelia-dependency-injection';
import {HttpInterceptor} from "../services/httpInterceptor";

@inject(HttpClient, HttpInterceptor)
export class HttpClientCRM{
  constructor(http){
    this.http = http;

    this.baseUrl = '/api/generic/v1/';
    // token is only valid for 30min
    // TODO: change for production solution
    // Live long token
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyTG9naW5JZCI6ImFkbWluIiwiaXNzIjoiQXBhY2hlT0ZCaXoiLCJleHAiOjE1ODc4NDI5OTk5OTk3MTgsImlhdCI6MTU4Nzg0MDkxOH0.3hZCbPuEoqQOUTYws1UtPToVuCZrQfaAVYkZIkPvAVd3m1cN-scUpIYErZFGTmMMfYHTEoMlbNlTG5l2GfkDVg';
    this.http.configure(config => {
      config
        .withBaseUrl(this.baseUrl);
    });
  }
}
