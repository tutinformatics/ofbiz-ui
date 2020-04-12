import {HttpClient, json} from 'aurelia-fetch-client';

export class ObjectDist {

  httpClient;

  constructor() {

    httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('api/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            let authHeader = "object-dist-auth-header";
            request.headers.append('Authorization', authHeader);
            return request;
          }
        });
    });

    this.generateVariables();
  }

  getRegex() {
    const querybuilder = document.querySelector('smart-query-builder');
    let queryArray = querybuilder.value;
    let filter = {};
    let conditionCount = 1;
    for (let i = 0; i < queryArray.length; i++) {
      if (typeof queryArray[i] == "object") filter[`condition${conditionCount}`] = JSON.stringify(queryArray[i]);
      else filter[`operator${conditionCount}`] = queryArray[i];
      conditionCount++;
    }
    console.log(JSON.stringify(filter));
  }

  generateVariables() {
    this.type = '';
    this.variables = [["Puldiauto", "Mängukaru", "Tuulelohe"], ["Arved", "Kasum", "Käive"], ["Püsiklient", "Tavaklient", "Partner"]];
    this.one = "Puldiauto";
    this.two = "Mängukaru";
    this.three = "Tuulelohe";
  }

  changeVariables() {
    if (this.type) {
      this.one = this.variables[this.type][0];
      this.two = this.variables[this.type][1];
      this.three = this.variables[this.type][2];
    }
  }

  getRequest() {
  }

  postRequest(filterString) {
    this.httpClient.fetch("comments", {
      method: "post",
      body: filterString
    })
  }

  generateKey() {
    console.log("Key Generated");  // TODO: ADD KEY GENERATION FOR PUBLISHER
  }
}
