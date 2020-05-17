import { inject } from 'aurelia-dependency-injection';
import { TaskService } from '../services/task-service';
import { Store } from 'aurelia-store';
import { faPlus, faCheck, faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from 'aurelia-router';
import {
  getStatusBadge,
  convertStatus
} from '../../../commons/util/status-utils';
import * as toastr from 'toastr';

@inject(TaskService, Store, Router)
export class TaskList {
  constructor(taskService, store, router) {
    this.taskService = taskService;
    this.store = store;
    this.router = router;
    this.faPlus = faPlus;
    this.faCheck = faCheck;
    this.faBars = faBars;
    this.subscription = this.store.state.subscribe(
      (state) => (this.state = state)
    );
  }

  get tasksSelected() {
    return !!this.grid && this.grid.selectedItems.length > 0;
  }

  attached() {
    this.grid = document.querySelector('vaadin-grid');
    this.initGridColumns();
    this.loadTasks();
  }

  loadTasks() {
    this.taskService
      .getTasks({
        partyId: this.state.userLoginId,
        statusId: 'PAS_ASSIGNED'
      })
      .then((response) => (this.grid.items = response));
  }

  initGridColumns() {
    const columns = document.querySelectorAll('vaadin-grid-column');
    columns[6].renderer = (root, columnm, rowData) => {
      const status = rowData.item.statusId;
      root.innerHTML = `
          <span class="badge ${getStatusBadge(status)}">
            ${convertStatus(status)}
          </span >
        `;
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

  handleComplete() {
    const tasks = this.grid.selectedItems.map(
      (task) =>
        (task = {
          workEffortId: task.workEffortId,
          partyId: task.partyId,
          roleTypeId: task.roleTypeId,
          fromDate: task.fromDate,
          statusId: 'PAS_COMPLETED'
        })
    );
    this.taskService
      .completeTasks(tasks)
      .then(() => {
        this.grid.selectedItems = [];
        this.loadTasks();
        toastr.success('Tasks successfully completed!');
      })
      .catch((error) => toastr.error(error.message));
  }

  handleAddTask() {
    this.router.navigate('new-task');
  }
}
