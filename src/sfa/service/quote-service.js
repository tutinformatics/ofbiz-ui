import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class QuoteService {
  baseUrl = 'https://sometotallyrandomapplicationonarandomurl.com:8443/api/generic/v1/';

  constructor(httpClient) {
    this.client = httpClient;
  }

  getQuotes() {
    return this.client
      .fetch(`${this.baseUrl}entities/Quote`)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  createNewQuote(quote) {
    this.client
      .fetch(`${this.baseUrl}entities/Quote`, {
        method: 'post',
        body: json(quote)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(reason => {
        // do something useful here
        console.error(reason);
      });
  }
}

