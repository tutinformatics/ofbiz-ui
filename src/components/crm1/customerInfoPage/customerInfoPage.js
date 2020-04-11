import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';
import {Person} from './person';

@inject(EventAggregator)
export class CustomerInfoPage {
  httpClient = new HttpClient();

  constructor(ea) {
    this.ea = ea;
  }

  activate() {
   this.getAllContacts()
  }

  getAllContacts() {
    this.httpClient.createRequest('http://localhost:7463/api/contact')
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
        }
      )
     ;
  }
}
