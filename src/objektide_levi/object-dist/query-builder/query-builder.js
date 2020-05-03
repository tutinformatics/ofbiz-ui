import "smart-webcomponents-community/source/styles/smart.default.css";
import "./query-builder.css";
import { smartQueryBuilder } from "../../../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js";
import {HttpClient} from "aurelia-fetch-client";

export class QueryBuilder {

  queryBuilder;

  constructor() {
    this.queryBuilder = Smart('#queryBuilder', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            {label: 'Party ID', dataField: 'partyIdFrom', dataType: 'string'},
            {label: 'Role type ID', dataField: 'roleTypeIdTo', dataType: 'string'},
          ]
        }
      }
    });
  }
}
