import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { connectTo } from "aurelia-store";
import { pluck } from "rxjs/operators";

@connectTo({
  selector: (store) => store.state.pipe(pluck('token')),
  target: 'currentState'
})
@inject(HttpClient)
export class AffManagerService {

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.httpClient.configure(config => {
        config
          .withBaseUrl('https://localhost:8443/api/')
          .withDefaults({
              credentials: 'same-origin',
              headers: {
                'Accept': 'application/json',
                'Authorization': localStorage.getItem("token")
              }
            }
          )
      }
    )
  }

  async pendingPartnersRequest() {
    const response = await this.httpClient.fetch("parties/unconfirmedAffiliates");
    return await response.json();
  }

  async approveRequest(partyId) {
    return await this.httpClient.fetch("parties/affiliate/approve",
      {
        method: "PUT",
        body: JSON.stringify(
          {"partyId": partyId}
        )
      }
    );
  }

  async disapproveRequest(partyId) {
    return await this.httpClient.fetch("parties/affiliate/disapprove",
      {
        method: "PUT",
        body: JSON.stringify(
          {"partyId": partyId}
        )
      }
    );
  }

  async allAffiliatesRequest() {
    const response = await this.httpClient
      .fetch("parties/affiliates");
    return await response.json();
  }

  async becomeAffPartner() {
    return await this.httpClient
      .fetch("parties/affiliate/create",
        {
          method: "POST",
          body: JSON.stringify(
            {"userLoginId": "admin"}
          ),
        }
      );
  }

  async myAffiliatesRequest() {
    return await this.httpClient.fetch("parties/affiliate",
      {
        method: 'POST',
        body: JSON.stringify(
          {"partyId": "DemoUser2"}
        )
      }
    )
  }

  async getStatusRequest() {
    return await this.httpClient.fetch("parties/unconfirmedAffiliates")
  }

  async getAffiliateCodesRequest() {
    const response = await this.httpClient.fetch("parties/affiliate/codes",
      {
        method: 'POST',
        body: JSON.stringify(
          {"partyId": "admin"}
        )
      }
    );
    return await response.json();
  }

  async generateAffiliateCodeRequest() {
    return await this.httpClient.fetch("parties/affiliate/code",
      {
        method: 'POST',
        body: JSON.stringify(
          {"partyId": "admin"}
        )
      }
    )
  }

  async deleteAffiliateCodeRequest(codeId) {
    return await this.httpClient.fetch("parties/affiliate/code",
      {
        method: 'DELETE',
        body: JSON.stringify(
          {
            "partyId": "admin",
            "affiliateCodeId": codeId,
          }
        )
      }
    )
  }


}
