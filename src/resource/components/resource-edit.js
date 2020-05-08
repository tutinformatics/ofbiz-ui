import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResourceEntities } from '../entities/resource-entities';

@inject(Router, ResourceEntities)
export class ProjectEditComponent {
  constructor(router, resourceEntities) {
    this.router = router;
    this.resourceEntities = resourceEntities;
    this.resource = {
      "occupation": null,
      "_ENTITY_NAME_": "PartyRoleAndPartyDetail",
      "suffix": null,
      "mothersMaidenName": null,
      "existingCustomer": null,
      "partyTypeId": "PERSON",
      "preferredCurrencyUomId": null,
      "_DELEGATOR_NAME_": "default",
      "partyId": "admin",
      "createdByUserLogin": null,
      "memberId": null,
      "height": null,
      "passportNumber": null,
      "lastNameLocal": null,
      "monthsWithEmployer": null,
      "weight": null,
      "personComments": null,
      "otherLocal": null,
      "logoImageUrl": null,
      "firstName": "TEST",
      "groupName": null,
      "statusId": "PARTY_ENABLED",
      "cardId": null,
      "partyGroupComments": null,
      "salutation": null,
      "totalYearsWorkExperience": null,
      "officeSiteName": null,
      "annualRevenue": null,
      "yearsWithEmployer": null,
      "lastName": "TEST",
      "gender": null,
      "employmentStatusEnumId": null,
      "socialSecurityNumber": null,
      "description": null,
      "middleNameLocal": null,
      "residenceStatusEnumId": null,
      "lastModifiedByUserLogin": null,
      "dataSourceId": null,
      "maritalStatusEnumId": null,
      "groupNameLocal": null,
      "numEmployees": null,
      "oldMaritalStatus": null,
      "nickname": null,
      "roleTypeId": "PROJECT_TEAM",
      "lastModifiedDate": null,
      "externalId": null,
      "tickerSymbol": null,
      "birthDate": null,
      "isUnread": null,
      "createdDate": null,
      "middleName": "PRIVILEGED",
      "firstNameLocal": null,
      "passportExpireDate": null,
      "personalTitle": "Mr.",
      "deceasedDate": null
    };
    this.roleList = [{
      text: 'Part of a project',
      value: 'PROJECT_TEAM'
    }];
  }

  get canSave() {
    return !!this.project.workEffortName;
  }

  addResource() {
    this.resourceEntities.createResource(this.resource)
      .then(() => this.router.navigate(''));
  }

  handleBack() {
    this.router.navigateBack();
  }
}
