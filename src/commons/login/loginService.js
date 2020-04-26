import { inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { setUserLoginId } from "../../store/store";

@inject(HttpClient, Store)
export class LoginService {

  constructor(httpClient, store) {
    this.httpClient = httpClient;
    this.store = store;
    this.store.registerAction('setUserLoginId', setUserLoginId);
  }

  async loginAttempt(username, password) {
    try {
      const response = await this.httpClient
        .fetch("https://localhost:8443/api/auth/v1",
          {
            method: 'POST',
            body: json({
                "username": username,
                "password": password
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

  async signUpRequest(username, password) {
    try {
      const response = await this.httpClient
        .fetch("https://localhost:8443/api/auth/v1",
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
        return true;
      }
    } catch (e) {
      return null
    }
  }

}
