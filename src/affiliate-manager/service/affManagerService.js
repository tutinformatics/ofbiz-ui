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
    try {
      const response = await this.httpClient.fetch("parties/unconfirmedAffiliates");
      return await response.json();
    } catch (e) {
      return null
    }
  }

  async approveRequest(partyId) {
    try {
      return await this.httpClient.fetch("parties/affiliate/approve",
        {
          method: "PUT",
          body: JSON.stringify(
            {"partyId": partyId}
          )
        }
      );
    } catch (e) {
      return null;
    }

  }

  async disapproveRequest(partyId) {
    try {
      return await this.httpClient.fetch("parties/affiliate/disapprove",
        {
          method: "PUT",
          body: JSON.stringify(
            {"partyId": partyId}
          )
        }
      );
    } catch (e) {
      return null;
    }
  }

  async allAffiliatesRequest() {
    try {
      const response = await this.httpClient
        .fetch("parties/affiliates");
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async becomeAffPartner() {
    try {
      return await this.httpClient
        .fetch("parties/affiliate/creae",
          {
            method: "POST",
            body: JSON.stringify(
              {"userLoginId": "admin"}
            ),
          }
        );
    } catch (e) {
      return null;
    }
  }

  async myAffiliatesRequest() {
    try {
      return await this.httpClient.fetch("parties/affiliate",
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": "DemoUser2"}
          )
        }
      )
    } catch (e) {
      return null;
    }
  }

  async getStatusRequest() {
    try{
      return await this.httpClient.fetch("parties/unconfirmedAffiliates")
    } catch (e) {
      return null;
    }
  }

  async getAffiliateCodesRequest() {
    try {
      const response = await this.httpClient.fetch("parties/affiliate/codes",
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": "admin"}
          )
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async generateAffiliateCodeRequest() {
    try {
      return await this.httpClient.fetch("parties/affiliate/code",
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": "admin"}
          )
        }
      )
    } catch (e) {
      return null;
    }
  }

  async deleteAffiliateCodeRequest(codeId) {
    try {
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
    } catch (e) {
      return null;
    }
  }

}
