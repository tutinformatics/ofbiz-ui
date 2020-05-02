import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Store } from 'aurelia-store';
import { setPartyId } from '../../store/store';

@inject(HttpClient, Store)
export class AffManagerService {
  baseUrl = 'api/';

  constructor(httpClient, store) {
    this.httpClient = httpClient;
    this.httpClient.configure((config) => {
      config
        // TODO: please re-consider setting baseUrl here, since it can break some services, that use static resources
        // .withBaseUrl('api/')
        .withDefaults({
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
    });
    this.store = store;
    this.store.registerAction('setPartyId', setPartyId);
    this.subscription = this.store.state.subscribe(
      (state) => (this.state = state)
    );
  }

  async pendingPartnersRequest() {
    try {
      const response = await this.httpClient.fetch(`${this.baseUrl}parties/unconfirmedAffiliates`);
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async approveRequest(partyId) {
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}parties/affiliate/approve"`, {
          method: 'PUT',
          body: JSON.stringify({ partyId: partyId })
        });
    } catch (e) {
      return null;
    }
  }

  async disapproveRequest(partyId) {
    try {
      return await this.httpClient
        .fetch(`${this.baseUrl}parties/affiliate/disapprove`, {
          method: 'PUT',
          body: JSON.stringify({ partyId: partyId })
        });
    } catch (e) {
      return null;
    }
  }

  async allAffiliatesRequest() {
    try {
      const response = await this.httpClient.fetch(`${this.baseUrl}parties/affiliates`);
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async becomeAffPartner() {
    return await this.httpClient.fetch(`${this.baseUrl}parties/affiliate/create`, {
      method: 'POST',
      body: JSON.stringify({ userLoginId: this.state.userLoginId })
    });
  }

  async getPartyId() {
    try {
      const response = await this.httpClient.fetch(`${this.baseUrl}parties/get-party-id`, {
        method: 'POST',
        body: JSON.stringify({ userLoginId: this.state.userLoginId })
      });
      if (response.ok) {
        const responseData = await response.json();
        this.store.dispatch('setPartyId', responseData.partyId);
        return responseData.partyId;
      }
    } catch (e) {
      return null;
    }
  }

  async myAffiliatesRequest() {
    try {
      return await this.httpClient.fetch(`${this.baseUrl}parties/affiliate`, {
        method: 'POST',
        body: JSON.stringify({ partyId: this.state.partyId })
      });
    } catch (e) {
      return null;
    }
  }

  async getStatusRequest() {
    try {
      return await this.httpClient.fetch(`${this.baseUrl}parties/unconfirmedAffiliates`);
    } catch (e) {
      return null;
    }
  }

  async getAffiliateCodesRequest() {
    try {
      const response = await this.httpClient.fetch(`${this.baseUrl}parties/affiliate/codes`, {
        method: 'POST',
        body: JSON.stringify({ partyId: this.state.partyId })
      });
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async generateAffiliateCodeRequest() {
    try {
      return await this.httpClient.fetch(`${this.baseUrl}parties/affiliate/code`, {
        method: 'POST',
        body: JSON.stringify({ partyId: this.state.partyId })
      });
    } catch (e) {
      return null;
    }
  }

  async deleteAffiliateCodeRequest(codeId) {
    try {
      return await this.httpClient.fetch(`${this.baseUrl}parties/affiliate/code`, {
        method: 'DELETE',
        body: JSON.stringify({
          partyId: this.state.partyId,
          affiliateCodeId: codeId
        })
      });
    } catch (e) {
      return null;
    }
  }
}
