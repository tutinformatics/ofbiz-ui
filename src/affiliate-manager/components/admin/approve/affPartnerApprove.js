import './affPartnerApprove.scss';
import { bindable } from 'aurelia-framework';

export class affPartnerApprove {

  @bindable selectedFilter;
  @bindable modifyUser;

  filteredValues = [];
  affCandidates;
  allKeys;


  constructor() {
    this.affCandidates = [{
      "firstName": "Ahto",
      "lastName": "R",
      "dateTimeCreated": "Mar 15, 2020, 6:56:48 PM",
      "email": "ter@gmail.com",
    }, {
      "firstName": "Martin",
      "lastName": "Hunt",
      "dateTimeCreated": "Mar 20, 2020, 8:56:48 PM",
      "email": "auf@gmail.com",
    }];

  }
}
