import "./becomePartner.scss"
import { inject } from 'aurelia-framework';
import { HttpClient } from "aurelia-fetch-client";
import { bindable } from "aurelia-templating";

@inject(HttpClient)
export class BecomePartner {

  @bindable isPending;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  // just for commit comment
  becomeAffPartner() {
    this.httpClient.fetch("http://localhost:4567/api/parties/affiliate/create",
      {method: 'post'})
      .then(response => response.json())
      .then(data => this.invoices = JSON.parse(data))
  }

}
