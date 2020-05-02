import {CategoryElement} from "./categoryElement";

export class Categories {
  constructor() {
    this.categories = [new CategoryElement("Call"),
      new CategoryElement("Invoices"),
      new CategoryElement("Notes"),
      new CategoryElement("Edit"),
      new CategoryElement("Add")];
  }
}
