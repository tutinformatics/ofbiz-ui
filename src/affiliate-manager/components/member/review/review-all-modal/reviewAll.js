import {DialogController} from 'aurelia-dialog';
import {bindable, inject} from "aurelia-framework";
import '../../../../assets/scss/modal.scss';
import './reviwAll.scss';

@inject(DialogController)
export class ReviewAll {


  pageSize = 3;

  products;


  constructor(dialogController) {
    this.controller = dialogController;
  }

  activate(data) {
    this.products = data;
  }
}
