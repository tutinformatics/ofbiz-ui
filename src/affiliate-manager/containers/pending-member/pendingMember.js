import '../general/affGeneral.scss';
import { HttpClient } from "aurelia-fetch-client";
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class PendingMember {

  partnerStatus = 'DEFAULT';

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.currentPage = 'Become-Partner';
    this.opened = false;
    this.getStatus()
  }

  getStatus() {
    this.httpClient
      .fetch("https://localhost:8443/api/parties/unconfirmedAffiliates")
      .then(
      (response) => {
        if (response.ok) {
          response.json().then((response) => {
            const unconfirmed = response.filter(
              partner => partner['partyId'] === "admin"
            );
            if (unconfirmed.length > 0) {
              this.partnerStatus = 'PENDING'
            }
          })
        }
      }
    )
  }

}
