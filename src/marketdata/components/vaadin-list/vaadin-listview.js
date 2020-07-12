import { inject } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';
import { Router } from 'aurelia-router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from 'aurelia-fetch-client';

@inject(Store, Router)
export class vaadinListview {
  constructor(router) {
    this.router = router;
    this.faBars = faBars;
  }

  attached() {
    const grid = document.querySelector('vaadin-grid');
    this.initGridColumns();
    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(companies => this.companies = companies)
      .then((response) => (grid.items = response));
  }

  initGridColumns() {
    const columns = document.querySelectorAll('vaadin-grid-column');
    columns[0].renderer = (root, column, rowData) => {
      const companyName = rowData.item.companyName;
      root.innerHTML = `<a href="javascript:void(0);">${companyName}<a/>`;
      root.addEventListener('click', () => this.handleSelectCompany(companyName));
    };

    const contextMenu = document.querySelector('vaadin-context-menu');
    contextMenu.listenOn = document.querySelector('vaadin-button');
    contextMenu.openOn = 'click';
    contextMenu.renderer = (root) => {
      root.innerHTML = '';
      columns.forEach((column) => {
        const checkbox = window.document.createElement('vaadin-checkbox');
        checkbox.style.display = 'block';
        checkbox.textContent = column.getAttribute('name');
        checkbox.checked = !column.hidden;
        checkbox.addEventListener('change', () => {
          column.hidden = !checkbox.checked;
        });
        // Prevent the context menu from closing when clicking a checkbox
        checkbox.addEventListener('click', (e) => {
          e.stopPropagation();
        });
        root.appendChild(checkbox);
      });
    };
  }

  get tasksSelected() {
    return !!this.grid && this.grid.selectedItems.length > 0;
  }
}
