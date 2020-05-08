import {DialogController} from 'aurelia-dialog';
import {bindable, inject} from "aurelia-framework";
import '../../../../assets/scss/modal.scss';
import './reviwAll.scss';

@inject(DialogController)
export class ReviewAll {


  pageSize = 20;

  products;
  productKeys = [];


  constructor(dialogController) {
    this.controller = dialogController;
  }

  activate(data) {
    this.products = data;
    this.productKeys = Object.keys(this.products[0]);
  }
}
