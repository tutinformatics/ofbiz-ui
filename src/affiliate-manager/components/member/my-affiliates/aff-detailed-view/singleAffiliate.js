import {DialogController} from 'aurelia-dialog';
import {inject} from "aurelia-framework";
import './singleAffiliate.scss';
import '../../../../assets/scss/modal.scss';

@inject(DialogController)
export class SingleAffiliate {

  constructor(dialogController) {
    this.controller = dialogController;
  }

  partner;

  activate(data) {
    this.partner = data;
  }
}
