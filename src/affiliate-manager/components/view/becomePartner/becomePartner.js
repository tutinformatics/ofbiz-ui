import "../../../assets/scss/becomePartner.scss"
import {HttpClient} from "aurelia-fetch-client";

let httpClient = new HttpClient();

export class BecomePartner {

  async becomeAffPartner() {
    httpClient.fetch("http://localhost:4567/api/invoices?id=api-invoices-get-all")
      .then(response => response.json())
      .then(data => this.invoices = JSON.parse(data))
  }

}
