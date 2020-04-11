import _ from 'lodash';

export class OrdersService {
  constructor() {
    this.activeOrders = [
      {
        orderId: 1,
        totalCost: 1125,
        dateOrdered: new Date(),
        startDate: new Date(),
        approxArrival: new Date() + 20,
        progress: 15,
        details: "Click for details"
      },
      {
        orderId: 2,
        totalCost: 400,
        dateOrdered: new Date(),
        startDate: new Date(),
        approxArrival: new Date() + 21,
        progress: 10,
        details: "Click for details"
      }
    ];
  }

  getActiveOrders() {
    return new Promise(resolve => {
      resolve(_.cloneDeep(this.activeOrders));
    });
  }

  /*
  createTask(task) {
    return new Promise(resolve => {
      const newTask = Object.assign({}, task);
      this.activeOrders.push(newTask);
      resolve(newTask);
    });
  }
  */
}
