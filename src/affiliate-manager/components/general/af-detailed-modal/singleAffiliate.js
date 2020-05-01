import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import './singleAffiliate.scss';
import '../../../assets/scss/modal.scss';

@inject(DialogController)
export class SingleAffiliate {

  partner;

  isAdmin;

  constructor(dialogController) {
    this.controller = dialogController;
  }


  activate(data) {
    this.isAdmin = data['isAdmin'];
    this.partner = data['partner'];
    this.getMoreInf(this.partner);
  }

  getMoreInf(partner) {
    console.log('Hello');
    console.log(this.isAdmin);
    partner['commission'] = 24;
    partner['date'] = '22/03/2020';
    partner['affiliate_codes'] = 2;
    partner['sub_affiliates'] = 5;
  }
}
