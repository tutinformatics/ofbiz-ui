import "smart-webcomponents-community/source/styles/smart.default.css";
import "./query-builder.css";
import { smartQueryBuilder } from "../../../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js";
import {HttpClient} from "aurelia-fetch-client";

export class QueryBuilder {

  queryBuilder;
  defaultFields = [
    { label: 'Id', dataField: 'id', dataType: 'number' },
    { label: 'Product', dataField: 'productName', dataType: 'string' },
    { label: 'Unit Price', dataField: 'price', dataType: 'number' },
    { label: 'Purchased', dataField: 'purchased', dataType: 'datetime' },
    { label: 'Available', dataField: 'available', dataType: 'boolean' }
  ]
  customFields = [
    { label: 'Sender ID', dataField: 'partyIdFrom', dataType: 'number' },
    { label: 'Due Date', dataField: 'dueDate', dataType: 'datetime' },
    { label: 'Description', dataField: 'description', dataType: 'string' },
  ]

  constructor() {
    this.queryBuilder = Smart('#queryBuilder', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            {label: 'Party ID', dataField: 'partyIdFrom', dataType: 'number'},
            {label: 'Role type ID', dataField: 'roleTypeIdTo', dataType: 'string'},
          ]
        }
      }
    });
  }
}
