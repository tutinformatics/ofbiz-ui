import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { OpportunityService } from '../../../service/opportunity-service.js';
import { Store } from 'aurelia-store';
import {QueryBuilder} from './../query-builder/query-builder';
@inject(EventAggregator, OpportunityService, Store, QueryBuilder)
export class OpportunityHeader {
  constructor(ea, opportunityService, store, queryBuilder) {
    this.ea = ea;
    this.opportunityService = opportunityService;
    this.store = store;
    this.queryBuilder = queryBuilder;
  }

  attached() {
    this.queryBuilderLoad();
  }
  dataOperatorMapping = {
    '<=': 'lessThanEqualTo',
    '<': 'lessThan',
    '>': ' greaterThan',
    '>=': ' greaterThanEqualTo',
    '=': 'equals',
    '<>': 'notEqual'
  }
  queryBuilderLoad() {
    let queryBuilders = document.querySelectorAll('smart-query-builder');
    for (let queryBuilder of queryBuilders) {
      queryBuilder.addEventListener('click', function() {
        let list = this.getElementsByClassName('smart-conditions-menu');
        let elements = this.getElementsByClassName('smart-element smart-menu-item smart-unselectable');
        for (let item of list) {
          if (item.style.left === '38px') {
            for (let element of elements) {
              if (element.value === 'or') {
                element.style.display = 'none';
              } else {
                element.style.display = '';
              }
            }
          } else if (item.style.left === '11px') {
            for (let element of elements) {
              if (element.value === 'or') {
                element.style.display = '';
              } else {
                element.style.display = 'none';
              }
            }
          }
        }
      });
    }
  }

  getFilterFromComponent() {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    let queryBuilder = queryBuilders[0];
    let queryArray = queryBuilder.value;
    let filters = [];
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] === 'object') {
        let filterComponent = [];
        for (let j = 0; j < queryArray[i].length; j++) {
          const data = queryArray[i][j];
          if (typeof data === 'object') {
            var filter;
            if (data[0] === "createdStamp") {
              filter = {
                'fieldName': data[0],
                'operation': this.dataOperatorMapping[data[1]],
                'value': Date.parse(data[2])
              };
            } else {
              filter = {
                'fieldName': data[0],
                'operation': this.dataOperatorMapping[data[1]],
                'value': data[2]
              };
            }
            filterComponent.push(filter);
          }
        }
        filters.push(filterComponent);
      }
    }
    return filters[0];
  }

  newOpportunity() {
    let opportunity = { name: this.name, description: this.description, price: this.price, pipelineId: "SAMPLE_ID1", customerId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", stage: this.stage };
    if (opportunity.stage === undefined) {
      opportunity.stage = "new";
    }
    this.opportunityService.createNewOpportunity(opportunity);
  };

  async applyFilter() {
    var body = this.getFilterFromComponent();
    var newData = [];
    var filteredData = await this.opportunityService.filter(body);
    filteredData["result"].forEach(function (opportunity) {
        newData.push(opportunity);
    });
    this.store.opportunities = newData;

    this.separateOpportunities(newData);
  }

  search() {
    var opportunities = [];
    var searchInput = this.searchInput;
    this.store.opportunitiesCopy.forEach(function (opportunity) {
      if (opportunity.opportunityId.toLowerCase().includes(searchInput.toLowerCase())
        || opportunity.name.toLowerCase().includes(searchInput.toLowerCase())) {
        opportunities.push(opportunity);
      }
    });
    this.store.opportunities = opportunities;
    this.separateOpportunities(opportunities);
  }

  separateOpportunities(data) {
    var newOpportunities = [];
    var wonOpportunities = [];
    var propositionOpportunities = [];
    data.forEach(function (opportunity) {
      if (opportunity.stage === "new") {
        newOpportunities.push(opportunity);
      } else if (opportunity.stage === "won") {
        wonOpportunities.push(opportunity);
      } else if (opportunity.stage === "proposition"){
        propositionOpportunities.push(opportunity);
      }
    });
    this.store.newOpp = newOpportunities;
    this.store.wonOpp = wonOpportunities;
    this.store.propositionOpp = propositionOpportunities;
  }
}
