import "./becomePartner.scss"
import { inject } from 'aurelia-framework';
import { HttpClient } from "aurelia-fetch-client";

@inject(HttpClient)
export class BecomePartner {

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.becomePartnerError = false;
    this.becomePartnerSuccess = false;
  }

  becomeAffPartner() {
    this.httpClient
      .fetch("https://localhost:8443/api/parties/affiliate/create",
        {
          method: "POST",
          body: JSON.stringify(
            {"userLoginId": "admin"}
          ),
        }).then(
      (response) => {
        if (response.ok) {
          this.setBecomePartnerSuccess(true)
        } else {
          this.setBecomePartnerError(true);
        }
      }
    )
  }

  setBecomePartnerError(value) {
    this.becomePartnerError = value;
    console.log(this.becomePartnerError)
  }

  setBecomePartnerSuccess(value) {
    this.becomePartnerSuccess = value;
  }

}
