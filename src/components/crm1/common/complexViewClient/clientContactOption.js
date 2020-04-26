import {clientContactOptionElement} from './clientContactOptionElement';

export class clientContactOption {
  constructor() {
    this.options = [new clientContactOptionElement("Call"),
      new clientContactOptionElement("Email"),
      new clientContactOptionElement("Meeting")];
  }

}
