import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class QuoteService {
  baseUrl = 'api/generic/v1/';

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
      .catch(reason => {
        // do something useful here
        console.error(reason);
      });
  }
  deleteQuoteById(id) {
    return this.client
      .fetch(
        `${this.baseUrl}entities/Quote?quoteId=` + id,
        {
          method: "DELETE"
        }
      );
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
  editQuote(quote) {
    this.client
      .fetch(`${this.baseUrl}entities/Quote`, {
        method: 'PUT',
        body: json(quote)
      })
  }
}

