export class GenerateCode {

  constructor() {
    this.affiliateCodeOptions = this.getAffiliateCodeOptions()
    this.affiliateCodes = this.getAffiliateCodes();
    this.filteredAffiliateCodes = this.affiliateCodes;
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
    ];
  }

  getAffiliateCodes() {
    return [
      {
        "code": "1472603",
        "date-of-creation": "22-03-2020",
        "status": "active",
        "expiration-date": "22-03-2022",
      },
      {
        "code": "5474689",
        "date-of-creation": "02-04-2020",
        "status": "active",
        "expiration-date": "22-03-2022",
      },
      {
        "code": "5577600",
        "date-of-creation": "10-03-2020",
        "status": "active",
        "expiration-date": "10-03-2022",
      },
    ]
  }

  setFilteredAffiliateCodes(filteredValue) {
    this.filteredAffiliateCodes = filteredValue;
  }
}
