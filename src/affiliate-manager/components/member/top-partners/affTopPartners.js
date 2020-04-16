export class AffTopPartners {

  constructor() {
    this.counter = 1;
    this.topPartnersOptions = this.getTopPartnersOptions();
    this.allTopPartnes = this.getAllTopPartners();
    this.filteredTopPartners = this.allTopPartnes;
  }

  incrementCounter() {
    return this.counter++;
  }

  getTopPartnersOptions() {
    return [
      {
        "key": 'place',
        "value": 'Place',
      },
      {
        "key": 'first-name',
        "value": 'First Name',
      },
      {
        "key": 'last-name',
        "value": 'Last Name',
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
  }

  getAllTopPartners() {
    return [
      {
        "place": `${this.incrementCounter()}`,
        "first-name": "Apa",
        "last-name": "Karls",
        "email": "mike@gmail.com",
        "partner-since": "24/11/2020",
        "commission-total": "25.90$",
        "partners-invited": "15",
      },
      {
        "place": `${this.incrementCounter()}`,
        "first-name": "Apa",
        "last-name": "Karls",
        "email": "mike@gmail.com",
        "partner-since": "24/11/2020",
        "commission-total": "25.90$",
        "partners-invited": "15",
      },
      {
        "place": `${this.incrementCounter()}`,
        "first-name": "Apa",
        "last-name": "Karls",
        "email": "mike@gmail.com",
        "partner-since": "24/11/2020",
        "commission-total": "25.90$",
        "partners-invited": "15",
      },
    ]
  }

  setFilteredTopPartners(filteredTopPartners) {
    this.filteredTopPartners = filteredTopPartners;
  }

}
