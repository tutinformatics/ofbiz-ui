import "./login.scss"
import { HttpClient, json } from "aurelia-fetch-client";
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Store } from "aurelia-store";
import { setToken, setUserLoginId } from "../../store/state";

@inject(HttpClient, Router, Store)
export class Login {

  username = null;
  password = null;

  constructor(httpClient, router, store) {
    this.store = store;
    this.store.registerAction('setUserLoginId', setUserLoginId);
    this.store.registerAction('setToken', setToken);
    this.router = router;
    this.httpClient = httpClient;
    this.forgotPassword = false;
  }

  setForgotPassword(value) {
    this.forgotPassword = value;
  }

  login() {
    this.httpClient
      .fetch("https://localhost:8443/api/auth/v1",
        {
          method: 'POST',
          body: json({
              "username": this.username,
              "password": this.password
            }
          )
        }
      ).then(
      (response) => {
        if (response.ok) {
          response
            .json()
            .then(
              (response) => {
                localStorage.setItem("userLoginId", response['userLoginId']);
                localStorage.setItem("token", response['token']);
                this.router.navigate("/")
              }
            )
        }
      }
    )
  }

}
