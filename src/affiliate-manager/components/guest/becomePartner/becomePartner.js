import "./becomePartner.scss"
import { HttpClient } from "aurelia-fetch-client";

export class BecomePartner {

  httpClient = new HttpClient();

  // just for commit comment
  becomeAffPartner() {
    httpClient.fetch("http://localhost:4567/api/parties/affiliate/create",
      {method: 'post'})
      .then(response => response.json())
      .then(data => this.invoices = JSON.parse(data))
  }

}
