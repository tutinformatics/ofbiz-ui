import { inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { setUserLoginId } from "../../store/store";

@inject(HttpClient, Store)
export class AuthService {

  constructor(httpClient, store) {
    this.httpClient = httpClient;
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
    this.store = store;
    this.store.registerAction('setUserLoginId', setUserLoginId);
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
        this.store.dispatch('setUserLoginId', responseData['userLoginId']);
        localStorage.setItem("userLoginId", responseData['userLoginId']);
        localStorage.setItem("token", responseData['token']);
        return true;
      }
    } catch (e) {
      return null
    }
  }

  async signUpRequest(username, password, verifiedPassword) {
    try {
      const response = await this.httpClient
        .fetch("api/auth/v1/register",
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
