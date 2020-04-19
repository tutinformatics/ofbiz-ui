export class AffTopPartners {

  counter = 1;

  nextCounterValue() {
    return this.counter++;
  }

  topPartnersOptions = [
    {
      "key": 'place',
      "value": 'Place',
    },
    {
      "key": 'email',
      "value": 'Email',
    },
    {
      "key": 'partner-since',
      "value": 'Partner since',
    },
    {
      "key": 'commission-total',
      "value": 'Commission Total',
    },
    {
      "key": 'partners-invited',
      "value": 'Partners invited',
    },
  ];

  topPartners = [
    {
      "email": "mike@gmail.com",
      "partner-since": "24/11/2020",
      "commission-total": "25.90$",
      "partners-invited": "15",
    },
    {
      "email": "mike@gmail.com",
      "partner-since": "24/11/2020",
      "commission-total": "25.90$",
      "partners-invited": "15",
    },
    {
      "email": "mike@gmail.com",
      "partner-since": "24/11/2020",
      "commission-total": "25.90$",
      "partners-invited": "15",
    },
  ]
}
