//import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {v1 as uuidv1} from 'uuid';
import {QueryBuilder} from "./query-builder/query-builder";
import toWords from 'split-camelcase-to-words';
import {HttpClient} from "aurelia-fetch-client";
import {NavigationService} from "../../commons/services/navigation-service";

@inject(HttpClient, QueryBuilder)
export class ObjectDist {

  httpClient;
  queryBuilder;
  selectedEntity;
  selectedEntityId;

  baseUrl = "api/generic/v1";
  objectDistBaseUrl = "api/objectdist"

  dataTypeMapping = {
    "ofbiz": "dataType",
    "id": "number",
    "id-long": "number",
    "id-vlong": "number",
    "numeric": "number",
    "date": "datetime",
    "date-time": "datetime",
    "description": "string",
    "currency-amount": "number",
    "indicator": "boolean",
    "short-varchar": "string",
    "long-varchar": "string",
    "very-long": "string",
    "very-short": "string",
    "comment": "string"
  }

  dataOperatorMapping = {
    "<=": "lessThanEqualTo",
    "<": "lessThan",
    ">": " greaterThan",
    ">=": " greaterThanEqualTo",
    "=": "equals",
    "<>": "notEqual",
  }

  constructor(httpClient, queryBuilder) {


    this.httpClient = httpClient;
    //this.setHTTPClient();
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
      queryBuilder.addEventListener('click', function () {
        var list = this.getElementsByClassName('smart-conditions-menu');
        var elements = this.getElementsByClassName('smart-element smart-menu-item smart-unselectable');
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

  setHTTPClient() {
    //log in via postman, add your jwt
    const jwt = 'eyJraWQiOiJrMSIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJBcGFjaGUgT2ZiaXoiLCJhdWQiOiJUbyB3aG9tIGl0IG1heSBjb25jZXJuIiwiZXhwIjoxNTg5MjI4MTMyLCJqdGkiOiJNMVBHZWZkcTlwT3RWUm1hc0lRR1NRIiwiaWF0IjoxNTg5MjI3NTMyLCJuYmYiOjE1ODkyMjc0MTIsInNlY3JldCI6ImV5SmhiR2NpT2lKQk1USTRTMWNpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMkluMC5XUC0wUHhQUW5DSTNNaE1aMWoxbThrU05jUjhsdEoydWxPbnY3M1lRemR3dDk1TmFpeVRSUWcuV0RCRG1FYWhpYV96akhtNm1LTFFudy40Sk1yZXoxQW1SR1RfaFk0ZUhyR1E3aW9vQkNBRHRvMDhwcjdRb3M1UWgxZkRtVTlvelhIWm9UcjFQdzlSLUp0U3NEZ2xaYmg3eEdGNmhrbXJYZTh0QS41S01xR2kza2pETGdnZTZiNDJfYkF3IiwiZ3JvdXBzIjpbIkZVTExBRE1JTiJdfQ.lY6a2FNqVfBHaJaK0rjR2e7Lb4wHc67SZM9G0sPDLqZiZU0xPn8IEzgcT6FP1JX7uTgEiG2Tn2O3O2nHiCfQvsgWJTev8erNogL_iXtESuSsDMsU-C56RUzfEoF3FeIVYQhcVtlvP2sOvaEM7QnMf9_m6_3RDvKNnRFsp_Ughm2oCq3yk9Vz4BxdFYGFm9SeSz9nj4We1_dpv5QZSEWi-oeS53xySVZBuKy48yCEh36CCWxrISk9QHO4Ksa3bqpQVfc1NxxBtdXi5IJbKnOKZ3M_9p1IMlqVXJwM_yD-MWEyGa49eHrClOz4r3YZweKe6Q8Jtv4pUuXeiObwvGIcLg'
    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://84.50.67.113:8443/api/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          }
        })
        .withInterceptor({
          request(request) {
            //console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            //console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }

  addEventListeners(isPublisher) {
    let entity = document.getElementById("publisherEntitiesSelect");
    if (!isPublisher) {
      entity = document.getElementById("subscriberEntitiesSelect");
    }
    let _self = this;
    entity.addEventListener("click", function () {
      let options = entity.querySelectorAll("option");
      let count = options.length;
      if (typeof (count) === "undefined" || count < 2) {
        if (isPublisher) {
          addActivityItemPublisher();
        } else {
          addActivityItemSubscriber();
        }
      }
    });

    entity.addEventListener("change", function () {
      if (isPublisher) {
        addActivityItemPublisher();
      } else {
        addActivityItemSubscriber();
      }
    });

    function addActivityItemPublisher() {
      _self.clearFields();
      _self.selectedEntity = document.getElementById("publisherEntitiesSelect").options[document.getElementById("publisherEntitiesSelect").selectedIndex].text;
      _self.getEntityFields(true);
    }

    function addActivityItemSubscriber() {
      _self.clearFields();
      _self.selectedEntity = document.getElementById("subscriberEntitiesSelect").options[document.getElementById("subscriberEntitiesSelect").selectedIndex].text;
      _self.getEntityFields(false);
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
        let customFields = []
        data.sort(function (a, b) {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        for (let field of data) {
          customFields.push({
            label: toWords(field.name),
            dataField: field.name,
            dataType: this.dataTypeMapping[field.type],
            filterOperations: ["=", "<=", "<", ">=", ">", "<>"]
          })
        }
        const queryBuilders = document.querySelectorAll('smart-query-builder');
        if (isPublisher) {
          queryBuilders[2].fields = customFields;
          this.populateSubscriberPublisherPropertiesField(isPublisher, false, data);
        } else {
          queryBuilders[0].fields = customFields;
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

  async getEntityFieldsByName(entityName, table) {
    this.httpClient.fetch(`${this.baseUrl}/structure/entities/${entityName}`)
      .then(response => response.json())
      .then(data => {
        data.sort(function (a, b) {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.populateTable(table, data);
      });
  }

  populateSubscriberPublisherPropertiesField(isPublisher, edit, data) {
    let tableBody;
    if (!edit) {
      tableBody = document.getElementById("property-table-body-add-subscribers");
      if (isPublisher) {
        tableBody = document.getElementById("property-table-body-add-publishers");
      }
      this.populateTable(tableBody, data);
    } else {
      tableBody = document.getElementById("property-table-body-edit-subscribers");
      if (isPublisher) {
        tableBody = document.getElementById("property-table-body-edit-publishers");
      }

      this.getEntityFieldsByName(data.OfbizEntityName, tableBody);
    }
  }

  populateTable(tableBody, data) {

    tableBody.innerHTML = '';
    let i = 1;
    for (let field of data) {

      let tableRow = document.createElement("tr");
      tableRow.className = "object-dist-properties-table";

      let tableHeader = document.createElement("th");
      tableHeader.scope = "row";
      tableHeader.innerHTML = i.toString();

      let propertyNameTd = document.createElement("td");
      propertyNameTd.innerHTML = toWords(field.name);

      let checkBoxTd = document.createElement("td");

      let checkboxInput = document.createElement("input");
      checkboxInput.type = "checkbox";

      checkBoxTd.appendChild(checkboxInput);
      tableRow.append(tableHeader, propertyNameTd, checkBoxTd);

      tableBody.appendChild(tableRow);
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
    this.selectedEntity = document.getElementById("subscriberEntitiesSelect").options[document.getElementById("subscriberEntitiesSelect").selectedIndex].text;
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
    this.selectedEntity = document.getElementById("publisherEntitiesSelect").options[document.getElementById("publisherEntitiesSelect").selectedIndex].text;
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
        document.getElementById("publisher_" + content.publisherId).addEventListener('click', function (event) {
          self.selectedEntityId = event.target.id.substring(10);
          self.httpClient.fetch(`${self.baseUrl}/entities/OfbizPublisher?OfbizPublisherId=${event.target.id.substring(10)}`)
            .then(response => response.json())
            .then(data => {
              self.editPublisher(data);
            });
        });
        document.getElementById("publisherDelete_" + content.publisherId).addEventListener('click', function (event) {
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
        document.getElementById("subscriber_" + content.subscriberId).addEventListener('click', function (event) {
          self.selectedEntityId = event.target.id.substring(11);
          self.httpClient.fetch(`${self.baseUrl}/entities/OfbizSubscriber?OfbizSubscriberId=${event.target.id.substring(11)}`)
            .then(response => response.json())
            .then(data => {
              self.editSubscriber(data);
            });
        });
        document.getElementById("subscriberDelete_" + content.subscriberId).addEventListener('click', function (event) {
          self.httpClient.delete(`${self.objectDistBaseUrl}/subscribers/delete/${event.target.id.substring(17)}`).then(r => {
            self.refreshPage()
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
    for (let entry in filterJson) {
      let list = [];
      filterList = filterJson[entry];
      for (let property in filterJson[entry]) {
        list.push([toWords(property), "=", filterJson[entry][property][0]])
        list.push("and");
      }
      list.pop()
      builderValues.push(list);
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
    let builder = document.querySelectorAll('smart-query-builder')[3];
    let filterJson = JSON.parse(entity.filter);
    let builderValues = [];
    let filterList = [];
    for (let entry in filterJson) {
      let list = [];
      filterList = filterJson[entry];
      for (let property in filterJson[entry]) {
        list.push([toWords(property), "=", filterJson[entry][property][0]])
        list.push("and");
      }
      list.pop()
      builderValues.push(list);
    }
    document.getElementById('editPublisherName').value = entity.OfbizEntityName;
    document.getElementById('editPublisherTopic').value = entity.topic;
    document.getElementById('editPublisherDescription').value = entity.description;
    builder.value = builderValues;
  }

  populateEditFields(isSubscriber, existingFilter) {
    this.httpClient.fetch(`${this.baseUrl}/structure/entities/${this.selectedEntity}`)
      .then(response => response.json())
      .then(data => {
        let customFields = []
        data.sort(function (a, b) {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        for (let field of data) {
          if (existingFilter[field.name] == null) {
            customFields.push({
              label: toWords(field.name),
              dataField: field.name,
              dataType: this.dataTypeMapping[field.type],
              filterOperations: ["=", "<=", ">=", "<", ">", "<>"]
            })
          }
        }
        const queryBuilders = document.querySelectorAll('smart-query-builder'); // TODO: add sorting, ma ei viitsi
        if (isSubscriber) {
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
      'properties': this.getProperties()
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
    location.reload();  // TODO rework
  }

  getFilterFromComponent(isPublisher) {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    let queryBuilder = queryBuilders[0];
    if (isPublisher) {
      queryBuilder = queryBuilders[2];
    }
    let queryArray = queryBuilder.value;
    let filters = [];
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] == "object") {
        let filterComponent = [];
        for (let j = 0; j < queryArray[i].length; j++) {
          const data = queryArray[i][j];
          if (typeof data == "object") {
            let filter = {
              "fieldName": data[0],
              "operation": this.dataOperatorMapping[data[1]],
              "value": data[2]
            };
            filterComponent.push(filter);
          }
        }
        filters.push(filterComponent)
      }
    }
    return JSON.stringify(filters);
  }

  getProperties() {
    var oTable = document.getElementById('properties-add-subscriber');
    var properties = {};
    var rowLength = oTable.rows.length;

    for (var i = 1; i < rowLength; i++) {
      var oCells = oTable.rows.item(i).cells;
      properties[oCells.item(1).innerHTML] = oCells.item(2).children[0].checked;
    }
    return JSON.stringify(properties);
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
      'filter': this.getEditFilterFromComponent(false)
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
      queryBuilder = queryBuilders[3];
    }
    let queryArray = queryBuilder.value;
    let filters = [];
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] == "object") {
        let filter = {};
        for (let j = 0; j < queryArray[i].length; j++) {
          const data = queryArray[i][j];
          if (typeof data == "object") {
            // filter[data[0]] = [data[1], data[2]];
            filter[data[0]] = [data[2]];
          }
        }
        filters.push(filter)
      }
    }
    return JSON.stringify(filters);
  }

  formCheck(index) {
    let faulty = false;
    let form = document.forms[index];
    for (let input in form) {
      if (form.hasOwnProperty(input)) {
        if (form[input].required && ((form[input].type == "text" || form[input].type == "textarea") && form[input].value == "")) {
          faulty = true;
        }
      }
    }

    if (faulty) {
      alert("Please Fill The Fields");
    } else {
      switch (index) {
        case 0:
          this.subscriberPostRequest();
          break;
        case 1:
          this.subscriberPutRequest();
          break
        case 2:
          this.publisherPostRequest();
          break;
        case 3:
          this.publisherPutRequest();
          break
      }
    }
  }
}
