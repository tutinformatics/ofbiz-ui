import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-dependency-injection';

@inject(HttpClient)
export class HttpClientCRM{
  constructor(http){
    this.http = http;

    this.baseUrl = 'https://localhost:8443/api/entities';

    this.http.configure(config => {
      config.withBaseUrl(this.baseUrl);
      config.withInterceptor({
        request(request) {
          return request;
        },
        requestError(error) {
          // ea.publish('http-request-error', error);
          throw error;
        },
        response(response) {
          // ea.publish('http-response', response);
          return response;
        },
        responseError(error) {
          // ea.publish('http-response-error', error);
          throw error;
        }
      })
    });

  }
}
