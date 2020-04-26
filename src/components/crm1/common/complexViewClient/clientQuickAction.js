import {clientQuickActionElement} from './clientQuickActionElement';

export class clientQuickAction {
  constructor() {
    this.options = [new clientQuickActionElement("Call"),
      new clientQuickActionElement("Invoices"),
      new clientQuickActionElement("Notes"),
      new clientQuickActionElement("Edit"),
      new clientQuickActionElement("Add")];
  }
}
