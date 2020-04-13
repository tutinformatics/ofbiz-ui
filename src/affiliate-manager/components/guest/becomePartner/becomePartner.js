import "./becomePartner.scss"
import {HttpClient} from "aurelia-fetch-client";

let httpClient = new HttpClient();

export class BecomePartner {

  // just for commit comment
  async becomeAffPartner() {
    httpClient.fetch("http://localhost:4567/api/parties/affiliates")
      .then(response => response.json())
      .then(data => this.invoices = JSON.parse(data))
  }

}
