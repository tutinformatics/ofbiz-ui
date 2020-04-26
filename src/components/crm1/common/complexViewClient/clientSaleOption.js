import {clientSaleOptionElement} from './clientSaleOptionElement';

export class clientSaleOption {
  constructor() {
    this.options = [new clientSaleOptionElement("Leads"),
      new clientSaleOptionElement("Opportunities"),
      new clientSaleOptionElement("Proposals"),
      new clientSaleOptionElement("Deals")];
  }
}
