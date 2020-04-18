import "../member-components.scss"
import { HttpClient } from "aurelia-fetch-client";
import moment from "moment";
import {bindable} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {SingleAffiliate} from "./aff-detailed-view/singleAffiliate"
import {inject} from "aurelia-dependency-injection";

@inject(HttpClient, DialogService)
export class MyAffiliates {

  constructor(httpClient, dialogService) {
    this.httpClient = httpClient;
    this.dialogService = dialogService;
    this.myAffiliatesOption = this.getMyAffiliateOptions();
    this.myAffiliatePartners = this.getMyAffiliatePartners();
    this.filteredAffiliatePartners = [];
  }

  getMyAffiliateOptions() {
    return [
      {
        "key": 'first-name',
        "value": 'First name',
      },
      {
        "key": 'last-name',
        "value": 'Last name',
      },
      {
        "key": 'email',
        "value": 'Email',
      },
      {
        "key": 'date',
        "value": 'Date',
      },
      {
        "key": 'status',
        "value": 'Status',
      },
    ];
  }

  async getMyAffiliatePartners() {
    const myPartners = [];
    const response = await this.httpClient
      .fetch("https://localhost:8443/api/parties/affiliates");
    const responseData = await response.json();
    responseData.forEach(partner =>
      myPartners.push(
        this.parsePartner(partner)
      )
    );
    this.filteredAffiliatePartners = myPartners;
    return myPartners;
  }

  setFilteredAffiliatePartners(filteredValues) {
    this.filteredAffiliatePartners = filteredValues;
  }

  parsePartner(partner) {
    const parsedDate = new Date(partner["createdStamp"]);
    return {
      "dateTimeCreated": moment(parsedDate).format('MM-D-YYYY'),
      "firstName": partner['firstName'],
      "lastName": partner['lastName'],
      "email": `${partner['firstName']}@gmail.com`,
      "status": 'active'
    }
  }



  delete(name) {

    this.data.splice(this.data.indexOf(name), 1);

  }


  @bindable
  action = () => {
  };


  detailedView(partner) {
    this.dialogService.open({
      viewModel: SingleAffiliate
      , model: partner
    }).then(result => {
      if (result.wasCancelled) {
        console.log("Hui");
        return;
      }
      this.action();
    });
  }
}

