import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient } from "aurelia-fetch-client";
import {inject} from 'aurelia-dependency-injection';

@inject(EventAggregator, HttpClient)
export class CustomerInfoPage {

  constructor(ea, http) {
    this.ea = ea;
    this.http = http;
    // this.ea.subscribe("clientId", async id => {
    //   console.log('subscribe')
    //   await this.getContact(id)
    // })
  }

  activate (parms) {
    this.getContact(parms.id)
  }

  async getContact(id) {
    let response = await this.http.createRequest(`contact/${id}`)
      .asGet()
      .send()
      .then(response => {
        let resJson = JSON.parse(response.response);
        this.firstName = resJson.firstName;
        this.lastName = resJson.lastName;
        this.email = resJson.emailAddress;
        this.phoneNumber = resJson.phoneNumber;
        this.companyName = resJson.companyName;
        this.position = resJson.roleTypeId;
        //   resJson[0].postalCode))
        this.companyAddress = resJson.address2;
        this.addressIndex = resJson.postalCode;
        console.log(resJson.lastName)

        return resJson;
        }
      );
    console.log(response)
  }

}
