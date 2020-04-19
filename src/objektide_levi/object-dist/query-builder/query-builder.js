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
          fieldsMode: 'dynamic',
          fields: [
            { label: 'Id', dataField: 'id', dataType: 'number', "filterOperations": ["="] },
            { label: 'Product', dataField: 'productName', dataType: 'string', "filterOperations": ["="] },
            { label: 'Unit Price', dataField: 'price', dataType: 'number', "filterOperations": ["="] },
            { label: 'Purchased', dataField: 'purchased', dataType: 'datetime', "filterOperations": ["="] },
            { label: 'Available', dataField: 'available', dataType: 'boolean', "filterOperations": ["="] }
          ]
        }
      }
    });
  }
}
