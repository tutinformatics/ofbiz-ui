
import "smart-webcomponents-community/source/styles/smart.default.css";
import "./query-builder.css";
import { smartQueryBuilder } from "../../../../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js";

export class QueryBuilder {

  queryBuilder;

  constructor() {
    this.queryBuilder = Smart('#queryBuilder', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            {label: 'price', dataField: 'price', dataType: 'number'},
            {label: 'stage', dataField: 'stage', dataType: 'string'},
            {label: 'date created', dataField: 'createdStamp', dataType: 'date'}
          ]
        }
      }
    });
  }
}
