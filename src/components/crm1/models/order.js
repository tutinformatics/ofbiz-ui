export class Order {
  constructor(orderId, orderDate, entryDate, partyId, webSiteId, roleTypeId, grandTotal, statusId) {
    this.orderId = orderId;
    this.orderDate = orderDate;
    this.entryDate = entryDate;
    this.partyId = partyId;
    this.webSiteId = webSiteId;
    this.roleTypeId = roleTypeId;
    this.grandTotal = grandTotal;
    this.statusId = statusId;
  }
}
