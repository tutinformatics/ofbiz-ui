import {HttpClient, json} from 'aurelia-fetch-client';
import { Router } from "aurelia-router";

export class ObjectDist {

  httpClient = new HttpClient();
  router;

  constructor(router) {
    this.router = router;
    this.setHTTPClient();
    this.fetchPublishers();
    this.fetchSubscribers();
  }

  setHTTPClient() {
    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://localhost:8443/api/objectdist/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }

  fetchPublishers() {
    this.httpClient.fetch("publishers")
      .then(response => response.json())
      .then(data => {
        this.populatePublishers(data);
      });
  }

  populatePublishers(data) {
    let table = document.getElementById("publisherTable");
    for(let entry in data) {  // currently duplicate with populateSubscribers, will change in future
      if (data.hasOwnProperty(entry)) {
        let content = data[entry];
        let row = table.insertRow();

        let cell1 = row.insertCell(0);
        cell1.className = "text-center";
        cell1.innerHTML = content.entityName;

        let cell2 = row.insertCell(1);
        cell2.className = "text-center";
        cell2.innerHTML = content.description;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = "<td><a class=\"btn btn-primary\" href=\"../#/object-dist\">EDIT</a></td>"
        cell3.className = "text-center";
      }
    }
  }

  populateSubscribers(data) {
    let table = document.getElementById("subscriberTable");
    for(let entry in data) {
      if (data.hasOwnProperty(entry)) {
        let content = data[entry];
        let row = table.insertRow();

        let cell1 = row.insertCell(0);
        cell1.className = "text-center";
        cell1.innerHTML = content.entityName;

        let cell2 = row.insertCell(1);
        cell2.className = "text-center";
        cell2.innerHTML = content.description;

        let cell3 = row.insertCell(2);
        cell3.innerHTML = "<td><a class=\"btn btn-primary\" href=\"../#/object-dist\">EDIT</a></td>"
        cell3.className = "text-center";
      }
    }
  }

  fetchSubscribers() {
    this.httpClient.fetch("subscribers")
      .then(response => response.json())
      .then(data => {
        this.populateSubscribers(data);
      });
  }

  makePostSubscriberPublisher(data, url) {
    this.httpClient.fetch(url, {
      method: "post",
      body: data
    })
  }

  subscriberPostRequest() {
    let data = {
      "OfbizSubscriberId": "0",
      "OfbizEntityName": document.getElementById("subscriberName").value,
      "topic": document.getElementById("subscriberTopic").value,
      "description": document.getElementById("subscriberDescription").value,
      "filter": this.getFilterFromComponent(false)
    };
    this.makePostSubscriberPublisher(JSON.stringify(data), "subscribers/create");
    this.refreshPage();
  }

  publisherPostRequest() {
    let data = {
      "OfbizPublisherId": "0",
      "OfbizEntityName": document.getElementById("publisherName").value,
      "topic": document.getElementById("publisherTopic").value,
      "description": document.getElementById("publisherDescription").value,
      "filter": this.getFilterFromComponent(true)
    };
    this.makePostSubscriberPublisher(JSON.stringify(data), "publishers/create");
    this.refreshPage();
  }

  refreshPage() {
    app.router.navigateToRoute('watch', {}, { replace: true, trigger: true });
  }

  getFilterFromComponent(isPublisher) {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    let queryBuilder = queryBuilders[0];
    if (isPublisher) {
      queryBuilder = queryBuilders[1];
    }
    let queryArray = queryBuilder.value;
    let filter = {};
    let conditionCount = 1;
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] == "object") filter[`condition${conditionCount}`] = JSON.stringify(queryArray[i]);
      else filter[`operator${conditionCount}`] = queryArray[i];
      conditionCount++;
    }
    return JSON.stringify(filter);
  }

  generateKey() {
    console.log("Key Generated");  // TODO: ADD KEY GENERATION FOR PUBLISHER
  }
}
