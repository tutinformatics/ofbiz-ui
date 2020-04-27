import {clientQuickActionElement} from './complexViewClient/clientQuickActionElement';
import {clientContactOptionElement} from './complexViewClient/clientContactOptionElement';

export class ActiveClient {
  constructor() {
    this.quickActionOptions = [new clientQuickActionElement("Call"),
      new clientQuickActionElement("Invoices"),
      new clientQuickActionElement("Notes"),
      new clientQuickActionElement("Edit"),
      new clientQuickActionElement("Add")];

    this.contactOptions = [new clientContactOptionElement("Call"),
      new clientContactOptionElement("Email"),
      new clientContactOptionElement("Meeting")];
  }


}

