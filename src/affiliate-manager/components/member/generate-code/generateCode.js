import { bindable, inject } from "aurelia-framework";
import moment from "moment";
import { AffManagerService } from "../../../services/affManagerService";
import { safeGet, safeGetExtended } from "../../../../commons/util/utility";

@inject(AffManagerService)
export class GenerateCode {

  filteredAffiliateCodes = [];
  affiliateCodes = [];
  discounts = {};
  @bindable
  selectedCategory;

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
    this.affiliateCodeOptions = this.getAffiliateCodeOptions();
  }

  async attached() {
    await this.getProductCategories();
    await this.getDiscounts();
    this.getAffiliateCodes();
  }

  async getProductCategories() {
    const categories = await this.affManagerService.fetchAllProductCategories();
    const localCategories = [];
    if (categories) {
      categories
        .filter(c => c['categoryName'] !== null)
        .forEach(c => localCategories.push(
            {
              'key': c['productCategoryId'],
              'value': c['categoryName'],
            }
          )
        )
    }
    this.productCategories = localCategories;
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

  async getDiscounts() {
    const response = await this.affManagerService.getAffiliateDiscounts();
    const localDiscounts = [];
    if (response.ok) {
      const jsonData = await response.json();
      jsonData['discounts'].forEach(d => {
        localDiscounts.push(d)
      })
    }
    this.discounts = localDiscounts;
  }

  async getAffiliateCodes() {
    const responseData = await this.affManagerService.getAffiliateCodesRequest();
    const localAffiliateCodes = [];
    responseData['affiliateDTOs'].forEach(code =>
      localAffiliateCodes.push(
        this.parseCode(code)
      )
    );
    this.affiliateCodes = localAffiliateCodes;
    this.filteredAffiliateCodes = this.affiliateCodes;
  }

  async generateAffiliateCode() {
    const response = await this.affManagerService.generateAffiliateCodeRequest(this.selectedCategory);
    if (response.ok) {
      response.json().then((response) => {
          this.affiliateCodes.push(
            this.parseCode(response['createdCode'])
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
      "dateOfCreation": safeGetExtended(() => parsedDate, moment(parsedDate).format('MM-D-YYYY'), 'Missing'),
      "code": safeGet(() => code['affiliateCodeId'], 'Missing'),
      "expirationDate": safeGetExtended(() => parsedDate, moment(parsedDate).format('MM-D-YYYY'), 'Missing'),
      "isDefault": code["isDefault"] === 'Y',
      "discount": safeGet(() => this.getDiscount(code['productCategoryId']), 'Missing'),
      "category": code['productCategoryId'] ? this.productCategories.find(c => c['key'] === code['productCategoryId'])['value'] : 'Missing'
    }
  }

  getDiscount(productCategoryId) {
    if (productCategoryId) {
      const discount = this.discounts.find(d => d['productCategoryId'] === productCategoryId);
      if (discount) {
        return `${discount['discount']}%`
      }
    }
    return null
  }
}
