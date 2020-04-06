import "smart-webcomponents-community/source/styles/smart.default.css";
import { smartQueryBuilder } from "../../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js";
import {HttpClient} from "aurelia-fetch-client";

'aurelia-http-client';

export class ObjectDist {

  queryBuilder;

  constructor() {
    this.queryBuilder = Smart('#queryBuilder', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            { label: 'Id', dataField: 'id', dataType: 'number' },
            { label: 'Product', dataField: 'productName', dataType: 'string' },
            { label: 'Unit Price', dataField: 'price', dataType: 'number' },
            { label: 'Purchased', dataField: 'purchased', dataType: 'datetime' },
            { label: 'Available', dataField: 'available', dataType: 'boolean' }
          ]
        }
      }
    });
    this.generateVariables();
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
