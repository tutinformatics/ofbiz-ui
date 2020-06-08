import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-dependency-injection';
import {computedFrom} from 'aurelia-framework';
import {EntityQueryService} from '../services/entityQueryService';

@inject(EventAggregator, EntityQueryService)

export class Categories {
  constructor(ea, entityQueryService) {
    this.ea = ea;
    this.entityQueryService = entityQueryService;
    this.partySearchInput = '';
    this.nameSearchInput = '';
    this.companySearchInput = '';
    this.parties = [];
    this.firstNames = [];
    this.lastNames = [];
    this.companies = [];
    this.includeFirstName = true;
    this.includeLastName = true;

    ea.subscribe('categoryCompany', payload => {
      this.companies = payload;
    });
    ea.subscribe('categoryPartiesIds', payload => {
      this.parties = payload;
    });
    ea.subscribe('categoryFirstNames', payload => {
      this.firstNames = payload;
    });
    ea.subscribe('categoryLastNames', payload => {
      this.lastNames = payload;
    });
    ea.subscribe('searchByCompany', payload => {
      this.companySearchInput = payload;
    });
  }

  async attached() {
    await this.getClassification();
  }

  @computedFrom('partySearchInput')
  get partySearchInputProcessed() {
    return this.partySearchInput.trim().toUpperCase()
  }
  @computedFrom('companySearchInput')
  get companySearchInputProcessed() {
    return this.companySearchInput.trim().toUpperCase()
  }

  get nameSearchInputProcessed() {
    return this.nameSearchInput.trim().toUpperCase()
  }

  @computedFrom('partySearchInputProcessed', 'parties')
  get filteredParties() {
    if (this.partySearchInputProcessed === '') {
      return this.parties.sort(function(a, b) {
        return a.toUpperCase().localeCompare(b.toUpperCase());
      });
    }
    return this.parties.filter(
      party => party && party.toUpperCase().startsWith(this.partySearchInputProcessed)
    ).sort(function(a, b) {
      return a.toUpperCase().localeCompare(b.toUpperCase());
    });
  }

  @computedFrom('companySearchInputProcessed', 'companies')
  get getCompanies() {
    if (this.companySearchInputProcessed === '') {
      return this.companies.sort();
    }
    return this.companies.filter(
      company => company && company.toUpperCase().split(' ')
        .map( el => el.startsWith(this.companySearchInputProcessed)).indexOf(true) > -1).sort()
  }
  @computedFrom('includeFirstName', 'firstNames')
  get getFirstNames() {
    if (this.includeFirstName) {
      return this.firstNames;
    }
    return [];
  }
  @computedFrom('includeLastName', 'lastNames')
  get getLastNames() {
    if (this.includeLastName) {
      return this.lastNames;
    }
    return [];
  }

  @computedFrom('nameSearchInput', 'firstNames', 'lastNames', 'includeFirstName', 'includeLastName')
  get names() {
    if (this.nameSearchInput.trim() === '') {
      return this.getFirstNames.concat(this.getLastNames).sort();
    }
    return this.getFirstNames.concat(this.getLastNames)
      .filter(
        name => name && name.toUpperCase().startsWith(this.nameSearchInputProcessed)
      ).sort();
  }

  unfilteredCustomers() {
    this.ea.publish('unfilteredCustomers', true);
  }

  filterByParty(party) {
    this.ea.publish('filterByParty', party);
  }

  filterByName(name) {
    this.ea.publish('filterByName', name);
  }

  filterByCompany(company) {
    this.ea.publish('filterByCompany', company);
  }


  capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
    }
    return 'null';
  }

  async getClassification() {
    let response = await this.entityQueryService.getClassification()
    console.log(response)

  }
}
