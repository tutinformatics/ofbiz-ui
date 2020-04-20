import { inject } from "aurelia-framework";
import moment from "moment";
import { AffManagerService } from "../../../service/affManagerService";

@inject(AffManagerService)
export class GenerateCode {

  filteredAffiliateCodes = [];
  affiliateCodes = [];
  selectedCategory;

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
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
    const responseData = await this.affManagerService.getAffiliateCodesRequest();
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

  async generateAffiliateCode() {
    const response = await this.affManagerService.generateAffiliateCodeRequest();
    if (response.ok) {
      response.json().then((response) => {
          this.affiliateCodes.push(
            this.parseCode(response)
          )
        }
      );
    }
  }

  async deleteAffiliateCode(codeId, index) {
    const response = await this.affManagerService.deleteAffiliateCodeRequest(codeId);
    if (response.ok) {
      this.affiliateCodes.splice(index, 1);
    }
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
