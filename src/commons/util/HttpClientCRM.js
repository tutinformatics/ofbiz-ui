import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';

@inject(HttpClient)
export class HttpClientCRM{
  constructor(http){
    this.http = http;

    this.baseUrl = 'https://localhost:8443/api/generic/v1';
    // token is only valid for 30min
    // TODO: change for production solution
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyTG9naW5JZCI6IkNybXRpaW0iLCJpc3MiOiJBcGFjaGVPRkJpeiIsImV4cCI6MTU4ODA5NjkyOCwiaWF0IjoxNTg4MDk1MTI4fQ.C-Fmrr0iL1rBqTrSHwDSN-LP76zFMCmtMoTxbDv9XpE05ZwCzYGS__-yjiJwiHiTGMNhpKQghKW550vq4ovImA';
    this.http.configure(config => {
      config
        .withBaseUrl(this.baseUrl)
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`,

          }
        }).withInterceptor({
        request(request) {
          console.log(`Requesting ${request.method} ${request.url}`);
          return request;
        },
        response(response) {
          console.log(`Received ${response.status} ${response.url}`);
          return response;
        }
      });
    });
  }
}
