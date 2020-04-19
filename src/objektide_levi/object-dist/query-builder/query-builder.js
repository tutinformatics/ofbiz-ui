import 'smart-webcomponents-community/source/styles/smart.default.css';
import './query-builder.css';

export class QueryBuilder {
  queryBuilder;
  defaultFields = [
    {label: 'Id', dataField: 'id', dataType: 'number'},
    {label: 'Product', dataField: 'productName', dataType: 'string'},
    {label: 'Unit Price', dataField: 'price', dataType: 'number'},
    {label: 'Purchased', dataField: 'purchased', dataType: 'datetime'},
    {label: 'Available', dataField: 'available', dataType: 'boolean'}
  ]
  customFields = [
    {label: 'Sender ID', dataField: 'partyIdFrom', dataType: 'number'},
    {label: 'Due Date', dataField: 'dueDate', dataType: 'datetime'},
    {label: 'Description', dataField: 'description', dataType: 'string'}
  ]

  constructor() {
    // eslint-disable-next-line new-cap
    this.queryBuilder = Smart('#queryBuilder', class {
      get properties() {
        return {
          allowDrag: true,
          fields: [
            {label: 'Party ID', dataField: 'partyIdFrom', dataType: 'number'},
            {label: 'Role type ID', dataField: 'roleTypeIdTo', dataType: 'string'},
          ]
        };
      }
    });
  }
}
