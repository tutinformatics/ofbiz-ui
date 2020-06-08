import { inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { setPartyId } from "../../store/store";
import { AureliaCookie } from "aurelia-cookie";

@inject(Store, HttpClient)
export class AffManagerService {

  baseUrl = 'api/';

  constructor(store, httpClient) {
    this.httpClient = httpClient;
    this.store = store;
    this.store.registerAction('setPartyId', setPartyId);
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.state = state;
      }
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  async pendingPartnersRequest() {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/entityquery/Affiliate`,
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "inputFields": {
                "status": "PENDING"
              },
              "fieldList": ["partyId", "createdStamp"],
              "entityRelations" : {
                "_toOne_Person": {
                  "fieldList": ["lastName", "firstName"]
                }
              }
            }
          ),
        }
      );
      if (response.ok) {
        return await response.json()
      }
      return null
    } catch (e) {
      return null
    }
  }

  async approveRequest(partnerToBeApproved) {
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/services/approveAffiliatePartner`,
        {
          method: "POST",
          body: JSON.stringify(
            {"partyId": partnerToBeApproved}
          ),
        }
      );
    } catch (e) {
      return null;
    }
  }

  async disapproveRequest(partnerToBeDisapproved) {
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/services/disapproveAffiliatePartner`,
        {
          method: "POST",
          body: JSON.stringify(
            {"partyId": partnerToBeDisapproved}
          ),
        }
      );
    } catch (e) {
      return null;
    }
  }

  async allAffiliatesRequest() {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/entityquery/Affiliate`,
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "inputFields": {
                "status": "ACTIVE"
              },
              "fieldList": ["partyId", "createdStamp", "status"],
              "entityRelations" : {
                "_toOne_Person": {
                  "fieldList": ["lastName", "firstName"]
                }
              }
            }
          ),
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async becomeAffPartner() {
    return await this.httpClient
      .fetch(
        `${this.baseUrl}generic/v1/services/createMultiLvlAffiliate`,
        {
          method: "POST",
          body: JSON.stringify(
            {
              "partyId": this.state.partyId,
              "affCode": AureliaCookie.get('affCode')
            }
          ),
        }
      );
  }

  async fetchPartyId() {
    try {
      const response = await this.httpClient
        .fetch(
          `${this.baseUrl}generic/v1/services/getPartyIdForUserId`,
          {
            method: 'POST',
            body: json({
                "userLoginId": this.state.userLoginId,
              }
            ),
          }
        );
      if (response.ok) {
        const responseData = await response.json();
        this.store.dispatch('setPartyId', responseData['partyId']);
        return responseData['partyId'];
      }
    } catch (e) {
      return null;
    }
  }

  async getAffiliateStatus(partyId) {
    try {
      const response = await this.httpClient
        .fetch(
          `${this.baseUrl}generic/v1/services/getAffiliateStatus`,
          {
            method: 'POST',
            body: json({
                "partyId": partyId,
              }
            ),
          }
        );
      if (response.ok) {
        const responseData = await response.json();
        return responseData['status'];
      }
    } catch (e) {
      return null;
    }
  }

  async myAffiliatesRequest() {
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/entityquery/Affiliate`,
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "inputFields": {
                "partyId": this.state.partyId
              },
              "fieldList": ["partyId"],
              "entityRelations" : {
                "_toOne_Affiliate": {
                  "fieldList": ["partyId", "createdStamp", "status", "RootPartyId"]
                }
              }
            }
          ),
        }
      );
    } catch (e) {
      return null;
    }
  }

  async getAffiliateCodesRequest() {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/services/getAffiliateCodes`,
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": this.state.partyId}
          ),
        }
      );
      return await response.json();
    } catch (e) {
      return null;
    }
  }

  async generateAffiliateCodeRequest(productCategoryId) {
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/services/createAffiliateCode`,
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "partyId": this.state.partyId,
              "productCategoryId": productCategoryId
            }
          ),
        }
      )
    } catch (e) {
      return null;
    }
  }

  async deleteAffiliateCodeRequest(codeId) {
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/services/deleteAffiliateCode`,
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "partyId": this.state.partyId,
              "affiliateCodeId": codeId,
            }
          ),
        }
      )
    } catch (e) {
      return null;
    }
  }

  async fetchAllProductCategories() {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/entityquery/ProductCategory`,
        {
          method: 'POST',
          body: JSON.stringify(
            {
              "fieldList": [
                "categoryName",
                "productCategoryId",
                "affiliateCommission",
              ]
            }
          ),
        }
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      return null;
    }
  }

  async disableAffiliate(partnerToBeDisabled) {
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/services/disableAffiliate`,
        {
          method: "POST",
          body: JSON.stringify(
            {"partyId": partnerToBeDisabled}
          ),
        }
      );
    } catch (e) {
      return null;
    }
  }

  async getAffiliateDiscounts() {
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}generic/v1/services/getAffiliateDiscounts`,
        {
          method: "POST",
          body: JSON.stringify({}),
        }
      );
    } catch (e) {
      return null;
    }
  }

  async setAffiliateDiscount(productCategoryId, amount) {
    try {
      const response = await this.httpClient.fetch(
        `${this.baseUrl}/generic/v1/services/setAffiliateDiscount`,
        {
          method: "POST",
          body: JSON.stringify(
            {
              "productCategoryId": productCategoryId,
              "amount": amount
            }
          ),
        }
      );
      return !!response.ok;

    } catch (e) {
      return null;
    }
  }

  async setCommission(commission, productCategoryId) {
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}/generic/v1/services/setCommission`,
        {
          method: "POST",
          body: JSON.stringify(
            {
              "productCategoryId": productCategoryId,
              "affiliateCommission": commission
            }
          ),
        }
      );
    } catch (e) {
      return null;
    }
  }

  async setGlobalSettings(settings){
    try {
      return await this.httpClient.fetch(
        `${this.baseUrl}/generic/v1/services/setAffiliateSettings`,
        {
          method: "POST",
          body: JSON.stringify(
            settings
          ),
        }
      );
    } catch (e) {
      return null;
    }
  }

}
