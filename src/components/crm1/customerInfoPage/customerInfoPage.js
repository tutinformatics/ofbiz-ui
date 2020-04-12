import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {inject} from 'aurelia-dependency-injection';

@inject(EventAggregator, HttpClientCRM)
export class CustomerInfoPage {

  constructor(ea, http) {
    this.ea = ea;
    this.http = http.http;
    // this.ea.subscribe("clientId", async id => {
    //   console.log('subscribe')
    //   await this.getContact(id)
    // })
  }

  activate (parms) {
    this.getContact(parms.id)
  }

  async getContact(id) {
    console.log('test' + id)
    let response = await this.http.createRequest('contact')
      .asGet()
      .send()
      .then(response => {
        let resJson = JSON.parse(response.response);
        this.firstName = resJson[id].firstName;
        this.lastName = resJson[id].lastName;
        this.email = resJson[id].emailAddress;
        this.phoneNumber = resJson[id].phoneNumber;
        this.companyName = resJson[id].companyName;
        this.position = resJson[id].roleTypeId;
        //   resJson[0].postalCode))
        this.companyAddress = resJson[id].address2;
        this.addressIndex = resJson[id].postalCode;
        console.log(resJson[id])

        return resJson[id];
        }
      );
    console.log(response)
  }

}
