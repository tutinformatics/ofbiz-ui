import { bindable, inject } from "aurelia-framework";
import moment from "moment";
import { AffManagerService } from "../../../services/affManagerService";
import { safeGet, safeGetExtended } from "../../../../commons/util/utility";

@inject(AffManagerService)
export class GenerateCode {

  filteredAffiliateCodes = [];
  affiliateCodes = [];
  @bindable
  selectedCategory;

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
    this.affiliateCodeOptions = this.getAffiliateCodeOptions();
  }

  async attached() {
    this.getAffiliateCodes();
    this.getProductCategories()
  }

  async getProductCategories() {
    const categories = await this.affManagerService.fetchAllProductCategories();
    const localCategories = [];
    if (categories) {
      categories
        .filter(c => c['categoryName'] !== null)
        .forEach(c => localCategories.push(
          {
            'key': c['categoryName'],
            'value': c['categoryName']
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
    const response = await this.affManagerService.generateAffiliateCodeRequest();
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
      "code": safeGet(() =>  code['affiliateCodeId'], 'Missing'),
      "expirationDate": safeGetExtended(() =>  parsedDate, moment(parsedDate).format('MM-D-YYYY'), 'Missing'),
      "isDefault": code["isDefault"] === 'Y',
      "category": 'None',
    }
  }

}
