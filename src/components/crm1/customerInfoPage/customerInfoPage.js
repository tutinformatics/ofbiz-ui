import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {inject} from 'aurelia-dependency-injection';

@inject(EventAggregator, HttpClientCRM)
export class CustomerInfoPage {

  constructor(ea, http) {
    this.ea = ea;
    this.http = http.http;
  }

  attached() {
   this.getAllContacts()
  }

  getAllContacts() {
    let response = this.http.createRequest('contact')
      .asGet()
      .send()
      .then(response => {
          let resJson = JSON.parse(response.response);
          // this.ea.publish(new Person(
        //   resJson[0].firstName,
        //   resJson[0].lastName,
        //   resJson[0].emailAddress,
        //   resJson[0].phoneNumber,
        //   resJson[0].companyName,
        //   "test",
        //   resJson[0].address2,
        //   resJson[0].postalCode))
          this.firstName = resJson[1].firstName;
          this.lastName = resJson[1].lastName;
          this.email = resJson[1].emailAddress;
          this.phoneNumber = resJson[1].phoneNumber;
          this.companyName = resJson[1].companyName;
          this.position = resJson[1].roleTypeId;
          this.companyAddress = resJson[1].address2;
          this.addressIndex = resJson[1].postalCode;
          return resJson[0];
        }
      );
  }
}
