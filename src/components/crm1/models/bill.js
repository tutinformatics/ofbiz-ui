export class Bill {
  constructor(partyIdFrom, partyIdTrans, amount, quantity, invoiceId, itemDescription, invoiceTypeId, invoiceDate) {
    this.partyIdFrom = partyIdFrom;
    this.partyIdTrans = partyIdTrans;
    this.amount = amount;
    this.quantity = quantity;
    this.invoiceId = invoiceId;
    this.itemDescription = itemDescription;
    this.invoiceTypeId = invoiceTypeId;
    this.invoiceDate = invoiceDate;
  }
}
