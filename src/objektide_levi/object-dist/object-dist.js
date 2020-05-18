//import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {v1 as uuidv1} from 'uuid';
import {QueryBuilder} from './query-builder/query-builder';
import toWords from 'split-camelcase-to-words';
import {HttpClient} from 'aurelia-fetch-client';
import camelCase from 'camelcase';

@inject(HttpClient, QueryBuilder)
export class ObjectDist {
  httpClient;
  queryBuilder;
  selectedEntity;
  selectedEntityId;

  baseUrl = 'api/generic/v1';
  objectDistBaseUrl = 'api/objectdist'

  dataTypeMapping = {
    'ofbiz': 'dataType',
    'id': 'number',
    'id-long': 'number',
    'id-vlong': 'number',
    'numeric': 'number',
    'date': 'datetime',
    'date-time': 'datetime',
    'description': 'string',
    'currency-amount': 'number',
    'indicator': 'boolean',
    'short-varchar': 'string',
    'long-varchar': 'string',
    'very-long': 'string',
    'very-short': 'string',
    'comment': 'string'
  }

  dataOperatorMapping = {
    '<=': 'lessThanEqualTo',
    '<': 'lessThan',
    '>': 'greaterThan',
    '>=': 'greaterThanEqualTo',
    '=': 'equals',
    '<>': 'notEqual'
  }

  dataOperatorMappingReversed = {
    'lessThanEqualTo': '<=',
    'lessThan': '<',
    'greaterThan': '>',
    'greaterThanEqualTo': '>=',
    'equals': '=',
    'notEqual': '<>'
  }

  constructor(httpClient, queryBuilder) {
    this.httpClient = httpClient;
    this.fetchPublishers();
    this.fetchSubscribers();
    this.fetchOfbizEntities();
    this.queryBuilder = queryBuilder;
  }

  attached() {
    this.queryBuilderLoad();
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

  addEventListeners(isPublisher) {
    let entity = document.getElementById('publisherEntitiesSelect');
    if (!isPublisher) {
      entity = document.getElementById('subscriberEntitiesSelect');
    }
    let _self = this;
    entity.addEventListener('click', function() {
      let options = entity.querySelectorAll('option');
      let count = options.length;
      if (typeof (count) === 'undefined' || count < 2) {
        if (isPublisher) {
          addActivityItemPublisher();
        } else {
          addActivityItemSubscriber();
        }
      }
    });

    entity.addEventListener('change', function() {
      if (isPublisher) {
        addActivityItemPublisher();
      } else {
        addActivityItemSubscriber();
      }
    });

    function addActivityItemPublisher() {
      _self.clearFields();
      _self.selectedEntity = document.getElementById('publisherEntitiesSelect').options[document.getElementById('publisherEntitiesSelect').selectedIndex].text;
      _self.getEntityFields(true);
    }

    function addActivityItemSubscriber() {
      _self.clearFields();
      _self.selectedEntity = document.getElementById('subscriberEntitiesSelect').options[document.getElementById('subscriberEntitiesSelect').selectedIndex].text;
    }
  }

  getEntityFields(isPublisher) {
    this.fetchOfbizEntityFields(isPublisher);
  }

  fetchPublishers() {
    this.httpClient.fetch(`${this.objectDistBaseUrl}/publishers`)
      .then(response => response.json())
      .then(data => {
        this.populatePublishers(data);
      });
  }

  fetchOfbizEntityFields(isPublisher) {
    this.httpClient.fetch(`${this.baseUrl}/structure/entities/${this.selectedEntity}`)
      .then(response => response.json())
      .then(data => {
        let customFields = [];
        data.sort(function(a, b) {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        for (let field of data) {
          if (!field.name.startsWith('_')) {
            customFields.push({
              label: toWords(field.name),
              dataField: field.name,
              dataType: this.dataTypeMapping[field.type],
              filterOperations: ['=', '<=', '<', '>=', '>', '<>']
            });
          }
        }
        const queryBuilders = document.querySelectorAll('smart-query-builder');
        if (isPublisher) {
          queryBuilders[0].fields = customFields;
          this.populateSubscriberPublisherPropertiesField(isPublisher, false, data);
        } else {
          this.populateSubscriberPublisherPropertiesField(isPublisher, false, data);
        }
      });
  }

  fetchOfbizEntities() {
    this.httpClient.fetch(`${this.baseUrl}/structure/entities/`)
      .then(response => response.json())
      .then(data => {
        this.populateSubscriberEntitiesDropdown(data);
        this.populatePublisherEntitiesDropdown(data);
        this.fetchOfbizEntityFields(false);
        this.fetchOfbizEntityFields(true);
      });
  }

  async getEntityFieldsByName(entity, table) {
    let name = entity.OfbizEntityName;
    this.httpClient.fetch(`${this.baseUrl}/structure/entities/${name}`)
      .then(response => response.json())
      .then(data => {
        data.sort(function(a, b) {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.populateTable(table, data, entity);
      });
  }

  populateSubscriberPublisherPropertiesField(isPublisher, edit, data) {
    let tableBody;
    if (!edit) {
      tableBody = document.getElementById('property-table-body-add-subscribers');
      if (isPublisher) {
        tableBody = document.getElementById('property-table-body-add-publishers');
      } else {
        this.populateTable(tableBody, data);
      }
    } else {
      tableBody = document.getElementById('property-table-body-edit-subscribers');
      if (isPublisher) {
        tableBody = document.getElementById('property-table-body-edit-publishers');
      } else {
        this.getEntityFieldsByName(data, tableBody);
      }
    }
  }

  populateTable(tableBody, data, entity = null) {
    tableBody.innerHTML = '';
    let i = 1;
    for (let field of data) {
      if (!field.name.startsWith('_')) {
        let tableRow = document.createElement('tr');
        tableRow.className = 'object-dist-properties-table';

        let tableHeader = document.createElement('th');
        tableHeader.scope = 'row';
        tableHeader.innerHTML = i.toString();

        let propertyNameTd = document.createElement('td');
        propertyNameTd.innerHTML = toWords(field.name);

        let checkBoxTd = document.createElement('td');

        let checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        if (entity != null && entity.properties.includes(field.name)) {
          checkboxInput.checked = true;
        }
        checkBoxTd.appendChild(checkboxInput);
        tableRow.append(tableHeader, propertyNameTd, checkBoxTd);

        tableBody.appendChild(tableRow);
      }
      i++;
    }
  }

  populateSubscriberEntitiesDropdown(data) {
    let select = document.getElementById('subscriberEntitiesSelect');
    for (let entity of data) {
      let opt = document.createElement('option');
      opt.value = entity;
      opt.innerHTML = entity;
      select.appendChild(opt);
    }
    this.addEventListeners(false);
    this.selectedEntity = document.getElementById('subscriberEntitiesSelect').options[document.getElementById('subscriberEntitiesSelect').selectedIndex].text;
  }

  populatePublisherEntitiesDropdown(data) {
    let select = document.getElementById('publisherEntitiesSelect');
    for (let entity of data) {
      let opt = document.createElement('option');
      opt.value = entity;
      opt.innerHTML = entity;
      select.appendChild(opt);
    }
    this.addEventListeners(true);
    this.selectedEntity = document.getElementById('publisherEntitiesSelect').options[document.getElementById('publisherEntitiesSelect').selectedIndex].text;
  }

  populatePublishers(data) {
    let table = document.getElementById('publisherTable');
    for (let entry in data) {  // currently duplicate with populateSubscribers, will change in future
      if (data.hasOwnProperty(entry)) {
        let content = data[entry];
        let row = table.insertRow();

        let cell1 = row.insertCell(0);
        cell1.className = 'text-center';
        cell1.innerHTML = content.entityName;

        let cell2 = row.insertCell(1);
        cell2.className = 'text-center';
        cell2.innerHTML = content.description;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = '<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editPublisher" style="margin: 2% 0 2% 0" id="publisher_' + content.publisherId + '">EDIT</button> <button type="button" class="btn btn-danger" style="margin: 2% 0 2% 0" id="publisherDelete_' + content.publisherId + '">DELETE</button></td>';
        cell3.className = 'text-center';
        let self = this;
        document.getElementById('publisher_' + content.publisherId).addEventListener('click', function(event) {
          self.selectedEntityId = event.target.id.substring(10);
          self.httpClient.fetch(`${self.baseUrl}/entities/OfbizPublisher?OfbizPublisherId=${event.target.id.substring(10)}`)
            .then(response => response.json())
            .then(data => {
              self.editPublisher(data);
            });
        });
        document.getElementById('publisherDelete_' + content.publisherId).addEventListener('click', function(event) {
          self.httpClient.delete(`${self.objectDistBaseUrl}/publishers/delete/${event.target.id.substring(16)}`).then(r => {
            self.refreshPage();
          });
        });
      }
    }
  }

  populateSubscribers(data) {
    let table = document.getElementById('subscriberTable');
    for (let entry in data) {
      if (data.hasOwnProperty(entry)) {
        let content = data[entry];
        let row = table.insertRow();

        let cell1 = row.insertCell(0);
        cell1.className = 'text-center';
        cell1.innerHTML = content.entityName;

        let cell2 = row.insertCell(1);
        cell2.className = 'text-center';
        cell2.innerHTML = content.description;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = '<td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editSubscriber" style="margin: 2% 0 2% 0" id="subscriber_' + content.subscriberId + '">EDIT</button> <button type="button" class="btn btn-danger" style="margin: 2% 0 2% 0" id="subscriberDelete_' + content.subscriberId + '">DELETE</button></td>';
        cell3.className = 'text-center';
        let self = this;
        document.getElementById('subscriber_' + content.subscriberId).addEventListener('click', function(event) {
          self.selectedEntityId = event.target.id.substring(11);
          self.httpClient.fetch(`${self.baseUrl}/entities/OfbizSubscriber?OfbizSubscriberId=${event.target.id.substring(11)}`)
            .then(response => response.json())
            .then(data => {
              self.editSubscriber(data);
            });
        });
        document.getElementById('subscriberDelete_' + content.subscriberId).addEventListener('click', function(event) {
          self.httpClient.delete(`${self.objectDistBaseUrl}/subscribers/delete/${event.target.id.substring(17)}`).then(r => {
            self.refreshPage();
          });
        });
      }
    }
  }

  editSubscriber(subscriber) {
    let entity = subscriber[0];
    this.populateSubscriberPublisherPropertiesField(false, true, entity);
    let builder = document.querySelectorAll('smart-query-builder')[1];
    let filterJson = JSON.parse(entity.filter);
    let builderValues = [];
    let filterList = [];
    for (const entry in filterJson) {
      let queryList = [];
      filterList = filterJson[entry];
      for (const property of filterJson[entry]) {
        let querySentence = [];
        querySentence.push(toWords(property.fieldName));
        querySentence.push(this.dataOperatorMappingReversed[property.operation]);
        querySentence.push(property.value);
        queryList.push(querySentence);
        queryList.push('and');
      }
      queryList.pop();
      builderValues.push(queryList);
    }
    document.getElementById('editSubscriberName').value = entity.OfbizEntityName;
    document.getElementById('editSubscriberTopic').value = entity.topic;
    document.getElementById('editSubscriberDescription').value = entity.description;
    this.selectedEntity = entity.OfbizEntityName;
    this.populateEditFields(true, filterList);
    builder.value = builderValues;
  }

  editPublisher(publisher) {
    let entity = publisher[0];
    this.populateSubscriberPublisherPropertiesField(true, true, entity);
    let builder = document.querySelectorAll('smart-query-builder')[1];
    let filterJson = JSON.parse(entity.filter);
    let builderValues = [];
    let filterList = [];
    for (let entry in filterJson) {
      let queryList = [];
      filterList = filterJson[entry];
      for (let property of filterJson[entry]) {
        let querySentence = [];
        querySentence.push(toWords(property.fieldName));
        querySentence.push(this.dataOperatorMappingReversed[property.operation]);
        querySentence.push(property.value);
        queryList.push(querySentence);
        queryList.push('and');
      }
      queryList.pop();
      builderValues.push(queryList);
    }
    document.getElementById('editPublisherName').value = entity.OfbizEntityName;
    document.getElementById('editPublisherTopic').value = entity.topic;
    document.getElementById('editPublisherDescription').value = entity.description;
    this.populateEditFields(false, filterList);
    builder.value = builderValues;
  }

  populateEditFields(isSubscriber, existingFilter) {
    this.httpClient.fetch(`${this.baseUrl}/structure/entities/${this.selectedEntity}`)
      .then(response => response.json())
      .then(data => {
        let customFields = [];
        data.sort(function(a, b) {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        for (let field of data) {
          if (existingFilter[field.name] == null && !field.name.startsWith('_')) {
            customFields.push({
              label: toWords(field.name),
              dataField: field.name,
              dataType: this.dataTypeMapping[field.type],
              filterOperations: ['=', '<=', '>=', '<', '>', '<>']
            });
          }
        }
        const queryBuilders = document.querySelectorAll('smart-query-builder');
        if (isSubscriber) {
          queryBuilders[1].fields = customFields;
        } else {
          queryBuilders[1].fields = customFields;
        }
      });
  }

  fetchSubscribers() {
    this.httpClient.fetch(`${this.objectDistBaseUrl}/subscribers`)
      .then(response => response.json())
      .then(data => {
        this.populateSubscribers(data);
      });
  }

  makePostSubscriberPublisher(data, url) {
    this.httpClient.fetch(url, {
      method: 'post',
      body: data
    }).then(r => {
      this.refreshPage();
    });
  }

  subscriberPostRequest() {
    let data = {
      'OfbizSubscriberId': '0',
      'OfbizEntityName': this.selectedEntity,
      'topic': document.getElementById('subscriberTopic').value,
      'description': document.getElementById('subscriberDescription').value,
      'filter': this.getFilterFromComponent(false),
      'properties': this.getProperties('properties-add-subscriber')
    };
    this.makePostSubscriberPublisher(JSON.stringify(data), `${this.objectDistBaseUrl}/subscribers/create`);
  }

  publisherPostRequest() {
    let data = {
      'OfbizPublisherId': '0',
      'OfbizEntityName': this.selectedEntity,
      'topic': document.getElementById('publisherTopic').value,
      'description': document.getElementById('publisherDescription').value,
      'filter': this.getFilterFromComponent(true)
    };
    this.makePostSubscriberPublisher(JSON.stringify(data), `${this.objectDistBaseUrl}/publishers/create`);
  }

  refreshPage() {
    location.reload();
  }

  getFilterFromComponent(isPublisher) {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    let queryBuilder = queryBuilders[0];
    if (isPublisher) {
      queryBuilder = queryBuilders[0];
    }
    let queryArray = queryBuilder.value; // will change, thats why its duplicate
    let filters = [];
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] === 'object') {
        let filterComponent = [];
        for (let j = 0; j < queryArray[i].length; j++) {
          const data = queryArray[i][j];
          if (typeof data === 'object') {
            let filter = {
              'fieldName': data[0],
              'operation': this.dataOperatorMapping[data[1]],
              'value': data[2]
            };
            filterComponent.push(filter);
          }
        }
        filters.push(filterComponent);
      }
    }
    return JSON.stringify(filters);
  }

  getProperties(id) {
    let oTable = document.getElementById(id);
    let properties = [];
    let rowLength = oTable.rows.length;

    for (let i = 1; i < rowLength; i++) {
      let oCells = oTable.rows.item(i).cells;
      if (oCells.item(2).children[0].checked) {
        properties.push(camelCase(oCells.item(1).innerHTML));
      }
    }
    return properties;
  }

  generateKey() {
    return uuidv1();
  }

  generatePublisherTopic() {
    document.getElementById('publisherTopic').value = this.generateKey();
  }

  clearFields() {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    for (let queryBuilder of queryBuilders) {
      queryBuilder.value = [];
    }
  }

  subscriberPutRequest() {
    let data = {
      'OfbizSubscriberId': this.selectedEntityId,
      'OfbizEntityName': this.selectedEntity,
      'topic': document.getElementById('editSubscriberTopic').value,
      'description': document.getElementById('editSubscriberDescription').value,
      'filter': this.getEditFilterFromComponent(false),
      'properties': this.getProperties('properties-edit-subscriber')
    };
    this.httpClient.fetch(`${this.baseUrl}/entities/OfbizSubscriber`, {
      method: 'put',
      body: JSON.stringify(data)
    }).then(r => {
      this.refreshPage();
    });
  }

  publisherPutRequest() {
    let data = {
      'OfbizPublisherId': this.selectedEntityId,
      'OfbizEntityName': this.selectedEntity,
      'topic': document.getElementById('editPublisherTopic').value,
      'description': document.getElementById('editPublisherDescription').value,
      'filter': this.getEditFilterFromComponent(true)
    };
    this.httpClient.fetch(`${this.baseUrl}/entities/OfbizPublisher`, {
      method: 'put',
      body: JSON.stringify(data)
    }).then(r => {
      this.refreshPage();
    });
  }

  getEditFilterFromComponent(isPublisher) {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    let queryBuilder = queryBuilders[1];
    if (isPublisher) {
      queryBuilder = queryBuilders[1];
    }
    let queryArray = queryBuilder.value;
    let filters = [];
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] === 'object') {
        let filterComponent = [];
        for (let j = 0; j < queryArray[i].length; j++) {
          const data = queryArray[i][j];
          if (typeof data === 'object') {
            let filter = {
              'fieldName': camelCase(data[0]),
              'operation': this.dataOperatorMapping[data[1]],
              'value': data[2]
            };
            filterComponent.push(filter);
          }
        }
        filters.push(filterComponent);
      }
    }
    return JSON.stringify(filters);
  }

  formCheck(index) {
    let faulty = false;
    let form = document.forms[index];
    for (let input in form) {
      if (form.hasOwnProperty(input)) {
        if (form[input].required && ((form[input].type == 'text' || form[input].type == 'textarea') && form[input].value == '')) {
          faulty = true;
        }
      }
    }

    if (faulty) {
      alert('Please Fill The Fields');
    } else {
      switch (index) {
      case 0:
        this.subscriberPostRequest();
        break;
      case 1:
        this.subscriberPutRequest();
        break;
      case 2:
        this.publisherPostRequest();
        break;
      case 3:
        this.publisherPutRequest();
        break;
      }
    }
  }
}
