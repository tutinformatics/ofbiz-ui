import {HttpClient, json} from 'aurelia-fetch-client';

export class ObjectDist {

  httpClient = new HttpClient();

  constructor() {
    this.setHTTPClient();
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

  getFilter(publisher) {
    const queryBuilders = document.querySelectorAll('smart-query-builder');
    let queryBuilder = queryBuilders[0];
    if (publisher) {
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

  postSubscriberPublisher(data, url) {
    this.httpClient.fetch(url, {
      method: "post",
      body: data
    }).then(response => {
      console.log(response);
    })
  }

  subscriberPostRequest() {
    let data = {
      "OfbizSubscriberId": "0",
      "OfbizSubscriberName": document.getElementById("name").value,
      "topic": document.getElementById("topic").value,
      "description": document.getElementById("description").value,
      "filter": this.getFilter(false)
    };
    console.log(document.getElementById("topic").value);
    console.log(document.getElementById("description").value);
    this.postSubscriberPublisher(JSON.stringify(data), "subscribers/create");
  }

  publisherPostRequest() {
    let data = {
      "OfbizPublisherId": "0",
      "OfbizPublisherName": document.getElementById("name").value,
      "topic": document.getElementById("topic").value,
      "description": document.getElementById("description").value,
      "filter": this.getFilter(true)
    };
    this.postSubscriberPublisher(JSON.stringify(data), "publishers/create");
  }

  generateKey() {
    console.log("Key Generated");  // TODO: ADD KEY GENERATION FOR PUBLISHER
  }
}
