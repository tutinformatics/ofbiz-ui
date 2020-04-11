import {HttpClient} from "aurelia-fetch-client";

export class ObjectDist {

  constructor() {
    this.generateVariables();
  }

  getRegex() {
    const querybuilder = document.querySelector('smart-query-builder');
    let customOperations = querybuilder.getDynamicField;
    console.log(customOperations);
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

  fetchData() {
    let httpClient = new HttpClient();
    httpClient.configure(config => {
      config
        .withBaseUrl('api/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
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


  generateKey() {
    console.log("Key Generated");  // TODO: ADD KEY GENERATION FOR PUBLISHER
  }
}
