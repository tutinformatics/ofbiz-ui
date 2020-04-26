import {clientDocumentOptionElement} from './clientDocumentOptionElement';

export class clientDocumentOption {
  constructor() {
    this.options = [new clientDocumentOptionElement("Invoices"),
      new clientDocumentOptionElement("Orders"),
      new clientDocumentOptionElement("Claims"),
      new clientDocumentOptionElement("Returned")];
  }
}
