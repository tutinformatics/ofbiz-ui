import {DialogController} from 'aurelia-dialog';
import {inject} from "aurelia-framework";
import './singleAffiliate.scss';
import '../../../../assets/scss/modal.scss';

@inject(DialogController)
export class SingleAffiliate {

  partner;

  constructor(dialogController) {
    this.controller = dialogController;
  }


  activate(data) {
    this.partner = data;
    this.getMoreInf(this.partner);
  }

  getMoreInf(partner) {
    partner["commission"] = 24;
    partner["date"] = "22/03/2020";
    partner["affiliate_codes"] = 2;
    partner["sub_affiliates"] = 5;
  }
}
