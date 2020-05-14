import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-dependency-injection';
import {computedFrom} from 'aurelia-framework';

@inject(EventAggregator)

export class Categories {
  constructor(ea) {
    this.ea = ea;
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

  @computedFrom('partySearchInput', 'parties')
  get filteredParties() {
    if (this.partySearchInput.trim() === '') {
      return this.parties.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
    }
    return this.parties.filter(
      party => party.toUpperCase().startsWith(this.partySearchInput.toUpperCase())
    ).sort(function(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  }

  @computedFrom('companySearchInput', 'companies')
  get getCompanies() {
    if (this.companySearchInput.trim() === '') {
      return this.companies.sort();
    }
    return this.companies.filter(
      company => company.toUpperCase().startsWith(this.companySearchInput.toUpperCase())
    ).sort();
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
        name => name !== null
          && name.toUpperCase().startsWith(this.nameSearchInput.toUpperCase())
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
    if (string !== null) {
      return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
    }
    return 'null';
  }
}
