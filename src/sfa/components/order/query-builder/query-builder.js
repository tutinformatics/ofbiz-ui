
import "smart-webcomponents-community/source/styles/smart.default.css";
import "./query-builder.css";
import { smartQueryBuilder } from "../../../../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js";

export class QueryBuilder {

  queryBuilder;

  constructor() {
    this.queryBuilder = Smart('#queryBuilderOrder', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            {label: 'grand total', dataField: 'grandTotal', dataType: 'number'},
            {label: 'sales channel', dataField: 'salesChannelEnumId', dataType: 'string'},
            {label: 'sales status', dataField: 'statusId', dataType: 'string'},
            {label: 'date created', dataField: 'createdStamp', dataType: 'date'},
            {label: 'date created', dataField: 'createdStamp', dataType: 'date'}
          ]
        }
      }
    });
  }
}
