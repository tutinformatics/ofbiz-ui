import "../member-components.scss"
import { HttpClient } from "aurelia-fetch-client";
import moment from "moment";
import { DialogService } from "aurelia-dialog";
import { SingleAffiliate } from "./aff-detailed-view/singleAffiliate"
import { inject } from "aurelia-dependency-injection";

@inject(HttpClient, DialogService)
export class MyAffiliates {

  myAffiliatePartners = [];
  filteredAffiliatePartners = [];

  constructor(httpClient, dialogService) {
    this.httpClient = httpClient;
    this.dialogService = dialogService;
    this.myAffiliatesOption = this.getMyAffiliateOptions();
    this.getMyAffiliatePartners();
  }

  getMyAffiliateOptions() {
    return [
      {
        "key": 'firstName',
        "value": 'First name',
      },
      {
        "key": 'lastName',
        "value": 'Last name',
      },
      {
        "key": 'email',
        "value": 'Email',
      },
      {
        "key": 'dateTimeCreated',
        "value": 'Date',
      },
      {
        "key": 'status',
        "value": 'Status',
      },
    ];
  }

  getMyAffiliatePartners() {
    this.httpClient
      .fetch("https://localhost:8443/api/parties/affiliate",
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": "DemoUser2"}
          )
        }
      ).then((response) => {
        if (response.ok) {
          response.json().then((response) => {
              response['subAffiliates'].forEach(partner => this.myAffiliatePartners.push(
                this.parsePartner(partner)
                )
              )
            }
          )
        }
      }
    );
    this.myAffiliatePartners.push({
      "dateTimeCreated": '03.04.2020',
      "firstName": "Alex",
      "lastName": "Groom",
      "email": 'ag@gmail.com',
      "status": 'Active'
    });
    this.filteredAffiliatePartners = this.myAffiliatePartners;
  }

  setFilteredAffiliatePartners(filteredValues) {
    this.filteredAffiliatePartners = filteredValues;
  }

  parsePartner(partner) {
    const parsedDate = new Date(partner["date"]);
    return {
      "dateTimeCreated": moment(parsedDate).format('MM-D-YYYY'),
      "firstName": partner['firstName'],
      "lastName": partner['lastName'],
      "email": partner['email']? partner['email']: 'missing',
      "status": partner['status']
    }
  }


  detailedView(partner) {
    this.dialogService.open({
      viewModel: SingleAffiliate
      , model: partner
    })
  }
}

