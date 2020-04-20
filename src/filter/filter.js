import "smart-webcomponents-community/source/styles/smart.default.css";
import "./filter.css";
import 'bootstrap';
import { smartQueryBuilder } from "../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js";
import {HttpClient} from "aurelia-fetch-client";

export class Filter {

  queryBuilder;

  constructor() {
    this.queryBuilder = Smart('#queryBuilder', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            { label: 'Id', dataField: 'id', dataType: 'number' },
            { label: 'Project Name', dataField: 'projectName', dataType: 'string' },
            { label: 'Date', dataField: 'datecreated', dataType: 'datetime' },
            { label: 'Available', dataField: 'available', dataType: 'boolean' }
          ]
        }
      }
    });
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
}
