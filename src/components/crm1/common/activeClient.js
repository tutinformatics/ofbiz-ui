import {clientQuickAction} from './complexViewClient/clientQuickAction';
import {clientContactOption} from './complexViewClient/clientContactOption';
import {clientSaleOption} from './complexViewClient/clientSaleOption';
import {clientDocumentOption} from './complexViewClient/clientDocumentOption';

export class ActiveClient {
  constructor() {
    this.quickActionOptions = [new clientQuickAction("Call"),
      new clientQuickAction("Invoices"),
      new clientQuickAction("Notes"),
      new clientQuickAction("Edit"),
      new clientQuickAction("Add")];

    this.contactOptions = [new clientContactOption("Call"),
      new clientContactOption("Email"),
      new clientContactOption("Meeting")];

    this.contactOptions = [new clientContactOption("Call"),
      new clientContactOption("Email"),
      new clientContactOption("Meeting")];

    this.saleOptions = [new clientSaleOption("Leads"),
      new clientSaleOption("Opportunities"),
      new clientSaleOption("Proposals"),
      new clientSaleOption("Deals")];

    this.options = [new clientDocumentOption("Invoices"),
      new clientDocumentOption("Orders"),
      new clientDocumentOption("Claims"),
      new clientDocumentOption("Returned")];
  }




}

