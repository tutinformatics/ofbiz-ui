import {bindable} from "aurelia-templating";

export class Review {

  counter = 1;

  @bindable
  selectedPeriod;

  incrementCounter() {
    return this.counter++;
  }

  affStatistics = [
    {
      "key": "week",
      "value": "Last week",
    },
    {
      "key": "month",
      "value": "Last month",
    },
    {
      "key": "year",
      "value": "Last year",
    },
  ];

  products = [
    {
      "id": "14",
      "name": "iPhone 11",
      "commission": "10.75$",
      "code": "287423",
      "code-owner": "loko@gmail.com",
    },
    {
      "id": "456",
      "name": "Coffee Cup",
      "commission": "0.50$",
      "code": "233214",
      "code-owner": "poki@gmail.com",
    },
    {
      "id": "234423",
      "name": "MX Master 2s",
      "commission": "3.05$",
      "code": "4554545",
      "code-owner": "tik@gmail.com",
    },
  ];

  partners = [
    {
      "first-name": "John",
      "last-name": "K",
      "email": "king@gmail.com",
      "commission": "17.85$",
      "registered-since": "15/05/2019",
      "sub-partners": "1",
    },
    {
      "first-name": "Patrick",
      "last-name": "Mill",
      "email": "queen@gmail.com",
      "commission": "45.00$",
      "registered-since": "22/10/19",
      "sub-partners": "5",
    }
  ];

  codes = [
    {
      "code": "287423",
      "commission": "156.00$",
      "active-since": "22/10/19",
      "times-used": "15",
      "category": "smart-devices",
      "invited": "40",
    },
    {
      "code": "287454",
      "commission": "556.08$",
      "active-since": "22/10/09",
      "times-used": "59",
      "category": "services",
      "invited": "11",
    },
    {
      "code": "287655",
      "commission": "87.90$",
      "active-since": "22/10/17",
      "times-used": "508",
      "category": "food",
      "invited": "0",
    },
  ]
}
