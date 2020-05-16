import { inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { setJwtToken, setUserLoginId, setPartyId } from "../../store/store";

@inject(Store, HttpClient)
export class AuthService {

  baseUrl = 'api/';

  constructor(store, httpClient) {
    this.httpClient = httpClient;
    this.store = store;
    this.store.registerAction('setUserLoginId', setUserLoginId);
    this.store.registerAction('setJwtToken', setJwtToken);
    this.store.registerAction('setPartyId', setPartyId);
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.jwtToken = state.jwtToken;
      }
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  async loginAttempt(username, password) {
    try {
      const response = await this.httpClient.fetch(
          `${this.baseUrl}auth/v1/login`,
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
        await this.store.dispatch('setJwtToken', responseData['token']);
        await this.store.dispatch('setUserLoginId', responseData['userLoginId']);
        return true;
      }
    } catch (e) {
      return null
    }
  }

  async signUpRequest(username, password, verifiedPassword) {
    try {
      const response = await this.httpClient
        .fetch(
          `${this.baseUrl}auth/v1/register`,
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

  isLoggedIn() {
    return !!this.jwtToken;
  }

}
