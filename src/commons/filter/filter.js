import "smart-webcomponents-community/source/styles/smart.default.css";
import "./filter.css";
import 'bootstrap';
import { smartQueryBuilder } from "../../../node_modules/smart-webcomponents-community/source/modules/smart.querybuilder.js";

export class Filter {

  queryBuilder;
  customFields = [
    { label: 'Project Priority', dataField: 'ProjectPriority', dataType: 'number' },
    { label: 'Start Date', dataField: 'dueDate', dataType: 'datetime' },
    { label: 'Description', dataField: 'description', dataType: 'string' },
  ]

  constructor() {
    this.queryBuilder = Smart('#queryBuilder', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            { label: 'Project Id', dataField: 'projectId', dataType: 'number' },
            { label: 'Project Name', dataField: 'projectName', dataType: 'string' },
            { label: 'Project Status ID', dataField: 'projectStatusId', dataType: 'number' }
          ]
        }
      }
    });
  }
}
