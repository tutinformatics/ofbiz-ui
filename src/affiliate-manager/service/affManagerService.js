import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { setPartyId } from "../../store/store";

@inject(HttpClient, Store)
export class AffManagerService {

  constructor(httpClient, store) {
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
    );
    this.store = store;
    this.store.registerAction('setPartyId', setPartyId);
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
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
    return await this.httpClient
      .fetch("parties/affiliate/create",
        {
          method: "POST",
          body: JSON.stringify(
            {"userLoginId": this.state.userLoginId}
          ),
        }
      );
  }

  async getPartyId() {
    try {
      const response = await this.httpClient
        .fetch("parties/get-party-id",
          {
            method: "POST",
            body: JSON.stringify(
              {"userLoginId": this.state.userLoginId}
            ),
          }
        );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData['partyId']);
        this.store.dispatch('setPartyId', responseData['partyId']);
        return responseData['partyId'];
      }
    } catch (e) {
      return null
    }
  }

  async myAffiliatesRequest() {
    try {
      return await this.httpClient.fetch("parties/affiliate",
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": this.state.partyId}
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
            {"partyId": this.state.partyId}
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
            {"partyId": this.state.partyId}
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
              "partyId": this.state.partyId,
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