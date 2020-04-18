import "../member-components.scss"
import {bindable} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {SingleAffiliate} from "./aff-detailed-view/singleAffiliate"
import {inject} from "aurelia-dependency-injection";

@inject(DialogService)
export class MyAffiliates {


  constructor(dialogService) {
    this.dialogService = dialogService;
    this.myAffiliatesOption = this.getMyAffiliateOptions();
    this.myAffiliatePartners = this.getMyAffiliatePartners();
    this.filteredAffiliatePartners = this.myAffiliatePartners;
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

  getMyAffiliatePartners() {
    return [
      {
        "first-name": "Mike",
        "last-name": "Sparksi",
        "email": "mike@gmail.com",
        "date": "24/11/2020",
        "status": "Active",
      },
      {
        "first-name": "Nick",
        "last-name": "Noi",
        "email": "nick.noi@gmail.com",
        "date": "22/03/2020",
        "status": "Active",
      },
      {
        "first-name": "Hutin",
        "last-name": "Pui",
        "email": "hutin@pui.com",
        "date": "26/11/2020",
        "status": "Active",
      },
    ]
  }

  setFilteredAffiliatePartners(filteredValues) {
    this.filteredAffiliatePartners = filteredValues;
  }

  detailedView(partner) {
    this.dialogService.open({
      viewModel: SingleAffiliate
      , model: partner
    }).then(result => {
      console.log(result);
    });
  }
}

