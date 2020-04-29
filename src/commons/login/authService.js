import { inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { setJwtToken, setUserLoginId, setPartyId } from "../../store/store";

@inject(HttpClient, Store)
export class AuthService {

  constructor(httpClient, store) {
    this.httpClient = httpClient;
    this.store = store;
    this.httpClient.configure(config => {
        config
          .withBaseUrl('api/')
          .withDefaults({
              headers: {
                'Accept': 'application/json',
              }
            }
          )
      }
    );
    this.store.registerAction('setUserLoginId', setUserLoginId);
    this.store.registerAction('setJwtToken', setJwtToken);
    this.store.registerAction('setPartyId', setPartyId);
  }

  async loginAttempt(username, password) {
    try {
      const response = await this.httpClient
        .fetch("auth/v1/login",
          {
            method: 'POST',
            body: json({
                "userLoginId": username,
                "currentPassword": password
              }
            )
          }
        );
      if (response.ok) {
        const responseData = await response.json();
        await this.store.dispatch('setUserLoginId', responseData['userLoginId']);
        await this.store.dispatch('setJwtToken', responseData['token']);
        this.fetchPartyId(username, password, responseData['token']);
        return true;
      }
    } catch (e) {
      return null
    }
  }

  async fetchPartyId(username, password, jwt) {
    try {
      const response = await this.httpClient
        .fetch(
          "generic/v1/services/getPartyIdForUserId",
          {
            method: 'POST',
            body: json({
                "userLoginId": username,
              }
            ),
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
      if (response.ok) {
        const responseData = await response.json();
        this.store.dispatch('setPartyId', responseData['partyId']);
      }
    } catch (e) {
      return null;
    }
  }

  async signUpRequest(username, password, verifiedPassword) {
    try {
      const response = await this.httpClient
        .fetch("auth/v1/register",
          {
            method: 'POST',
            body: json({
                "userLoginId": username,
                "currentPassword": password,
                "currentPasswordVerify": verifiedPassword
              }
            )
          }
        );
      if (response.ok) {
        return true;
      }
    } catch (e) {
      return null
    }
  }

}
