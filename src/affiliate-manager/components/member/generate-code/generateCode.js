import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import moment from "moment";

@inject(HttpClient)
export class GenerateCode {

  filteredAffiliateCodes = [];
  affiliateCodes = [];
  selectedCategory;

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.affiliateCodeOptions = this.getAffiliateCodeOptions();
    this.productCategories = this.getProductCategories();
    this.getAffiliateCodes();
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
    const response = await this.httpClient
      .fetch("https://localhost:8443/api/parties/affiliate/codes",
        {
          method: 'POST',
          body: JSON.stringify(
            {"partyId": "admin"}
          )
        }
      );
    const responseData = await response.json();
    responseData.forEach(code =>
      this.affiliateCodes.push(
        this.parseCode(code)
      )
    );
    this.affiliateCodes.push(
      {
        "code": "1472603",
        "dateOfCreation": "22-03-2020",
        "status": "Active",
        "expirationDate": "22-03-2022",
        "category": "Electronics",
        "isDefault": false,
      },
    );
    this.filteredAffiliateCodes = this.affiliateCodes;
  }

  generateAffiliateCode() {
    if (this.selectedCategory) {
      this.httpClient
        .fetch("https://localhost:8443/api/parties/affiliate/code",
          {
            method: 'POST',
            body: JSON.stringify(
              {"partyId": "admin"}
            )
          }
        ).then((response) => {
          if (response.ok) {
            response.json().then((response) => {
                this.affiliateCodes.push(
                  this.parseCode(response)
                )
              }
            );
          }
        }
      );
    }
  }

  deleteAffiliateCode(codeId, index) {
    this.httpClient
      .fetch("https://localhost:8443/api/parties/affiliate/code",
        {
          method: 'DELETE',
          body: JSON.stringify(
            {
              "partyId": "admin",
              "affiliateCodeId": codeId,
            }
          )
        }
      ).then((response) => {
        if (response.ok) {
          this.affiliateCodes.splice(index, 1);
        }
      }
    );

  }

  setFilteredAffiliateCodes(filteredValue) {
    this.filteredAffiliateCodes = filteredValue;
  }

  parseCode(code) {
    const parsedDate = new Date(code["createdStamp"]);
    return {
      "dateOfCreation": moment(parsedDate).format('MM-D-YYYY'),
      "code": code['affiliateCodeId'],
      "expirationDate": moment(parsedDate).format('MM-D-YYYY'),
      "isDefault": code["isDefault"] === 'Y',
      "category": 'none',
    }
  }
}
