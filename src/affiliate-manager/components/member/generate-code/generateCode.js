export class GenerateCode {

  constructor() {
    this.affiliateCodeOptions = this.getAffiliateCodeOptions();
    this.affiliateCodes = this.getAffiliateCodes();
    this.productCategories = this.getProductCategories();
    this.filteredAffiliateCodes = this.affiliateCodes;
  }

  getProductCategories() {
    return [
      {
        "key": 'services',
        "value": 'Services',
      },
      {
        "key": 'electronics',
        "value": 'Electronics',
      },
      {
        "key": 'weapon',
        "value": 'Weapon',
      },
    ]
  }

  getAffiliateCodeOptions() {
    return [
      {
        "key": 'code',
        "value": 'Code',
      },
      {
        "key": 'date-of-creation',
        "value": 'Date of Creation',
      },
      {
        "key": 'status',
        "value": 'Status',
      },
      {
        "key": 'expiration-date',
        "value": 'Expiration date',
      },
      {
        "key": 'is-default',
        "value": 'Is default',
      },
      {
        "key": 'category',
        "value": 'Category',
      },
    ];
  }

  getAffiliateCodes() {
    return [
      {
        "code": "1472603",
        "date-of-creation": "22-03-2020",
        "status": "Active",
        "expiration-date": "22-03-2022",
        "category": "Electronics",
        "is-default": true,
      },
      {
        "code": "5474689",
        "date-of-creation": "02-04-2020",
        "status": "Active",
        "expiration-date": "22-03-2022",
        "category": "Services",
        "is-default": false,
      },
      {
        "code": "5577600",
        "date-of-creation": "10-03-2020",
        "status": "Active",
        "expiration-date": "10-03-2022",
        "category": "Weapon",
        "is-default": false,
      },
    ]
  }

  setFilteredAffiliateCodes(filteredValue) {
    this.filteredAffiliateCodes = filteredValue;
  }
}
