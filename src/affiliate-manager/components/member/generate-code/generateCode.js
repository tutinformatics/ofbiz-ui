import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import moment from "moment";

@inject(HttpClient)
export class GenerateCode {

  constructor(httpClient) {
    this.selectedCategory = null;
    this.httpClient = httpClient;
    this.affiliateCodeOptions = this.getAffiliateCodeOptions();
    this.filteredAffiliateCodes = [];
    this.affiliateCodes = this.getAffiliateCodes();
    this.productCategories = this.getProductCategories();
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

  async getAffiliateCodes() {
    const codes = [];
    const response = await this.httpClient
      .fetch("https://localhost:8443/api/parties/getCodes",
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": "admin"}
          )
        }
      );
    const responseData = await response.json();
    responseData.forEach(code =>
      codes.push(
        this.parseCode(code)
      )
    );
    codes.push(
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
    );
    this.filteredAffiliateCodes = codes;
    return codes;
  }

  async generateAffiliateCode() {
    if (this.selectedCategory) {
      const response = await this.httpClient
        .fetch("https://localhost:8443/api/parties/createCode",
          {
            method: 'POST',
            body: JSON.stringify(
              {"partyId": "admin"}
            )
          }
        );
      const responseData = await response.json();
      responseData.forEach(newCode =>
        this.affiliateCodes.push(
          this.parseCode(newCode)
        )
      );
    }
  }

  setFilteredAffiliateCodes(filteredValue) {
    this.filteredAffiliateCodes = filteredValue;
  }

  parseCode(code) {
    const parsedDate = new Date(code["createdStamp"]);
    return {
      "date-of-creation": moment(parsedDate).format('MM-D-YYYY'),
      "code": code['affiliateCodeId'],
      "expiration-date": moment(parsedDate).format('MM-D-YYYY'),
      "is-default": false,
      "status": 'active',
      "category": 'none',
    }
  }
}
